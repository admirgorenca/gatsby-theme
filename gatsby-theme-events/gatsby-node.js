const fs = require('fs');

// 1. make sure the data directory exists
exports.onPreBootstrap = ({ reporter }) => {
  const contentPath = 'data';

  if (!fs.existsSync(contentPath)) {
    reporter.info(`Creating th ${contentPath} directory`);
    fs.mkdirSync(contentPath);
  }
};

// 2. define the event type
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
  type Event implements Node @dontInfer {
    id: ID!
    title: String!
    url: String!
    date: Date! @dateformat @proxy(from: "date")
    slug: String!
  }
  `) 
}

// 3. define resolvers for anu custon fields (slug)
exports.createResolvers = ({ createResolvers }) => {
  const basePath = '/';
  
  const slugify = str => {
    const slug = str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    
    return `/${basePath}/${slug}`.replace(/\/\/+/g, '/');
  }

  createResolvers({
    Event: {
      slug: {
        resolve: source => slugify(source.title)
      }
    }
  })
}

// 4. query for events and create pages
exports.createPages = async ({ actions, graphql, reporter }) => {
  const basePath = '/';
  actions.createPage({
    path: basePath,
    component: require.resolve('./src/templates/events.js')
  });

  const result = await graphql(`
  query {
    allEvent(sort: { fields: date, order: ASC}) {
      nodes {
        id
        slug
      }
    }
  }
  `);

  if(result.errors) {
    reporter.panic('error loading events', reporter.errors);
    return;
  }

  const events = result.data.allEvent.nodes;

  events.forEach(event => {
    const slug = event.slug

    actions.createPage({
      path: slug,
      component: require.resolve('./src/templates/event.js'),
      context: {
        eventID: event.id
      }
    });
  });
}