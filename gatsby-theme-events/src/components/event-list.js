import React from 'react';
import { Link } from 'gatsby';

const EventList = ({ events }) =>  (
  <>
  <h1>Events</h1>
  <ul>
    {events.map(event => (
      <li key={event.id}>
        <strong>
          <Link to={event.slug}>{event.title}</Link>
        </strong>
        <br />
        {event.date}
        <br />
        {event.url}
      </li>
    ))}
  </ul>
  </>
  );

export default EventList;