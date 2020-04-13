import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Event from '../components/event';


export const query = graphql`
  query ($eventID: String!) {
    event(id: {eq: $eventID }) {
      title
      url
      date
      slug
    }
  }
`

const EventTemplate = ({ data: { event } }) => (
  <Layout>
    <Event {...event} />
  </Layout>
  );

export default EventTemplate;
