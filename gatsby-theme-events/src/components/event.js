import React from 'react'


const Event = ({ title, url, date }) => (
  <div>
    <h1>{title} ({date})</h1>
    <p>
      Website: <a href={url}>{url}</a>
    </p>
  </div>
)

export default Event;