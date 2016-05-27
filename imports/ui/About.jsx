import React from 'react'
import { render } from 'react-dom'


export default class About extends React.Component {

  render() {
    return (
      <div className="about">
        <h2> a site by Catalin for freecodecamp.com challenge -- Build a Nightlife Coordination App --</h2>
        Made using Meteor, mongoDB, React, React-router, bootstrap
        <br />
        The "who" button only shows people that confirmed to go locally (only for local users)
        <br />
        <h3>
          The site is using the <a href="https://developer.foursquare.com">FOURSQUARE API</a>
        </h3>
      </div>
    )
  }
}