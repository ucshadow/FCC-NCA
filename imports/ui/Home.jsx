import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data';
import { render } from 'react-dom';


import GetLoc from '../ui/GetLoc.jsx';


export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {location: null};

    this.getKey = this.getKey.bind(this);
    this.startSearching = this.startSearching.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  getKey(key) {
    if(key.keyCode === 13) {
      this.startSearching()
    }
  }

  startSearching() {
    let query = document.getElementById("q").value;
    if(query.charCodeAt(0) && $.trim(query).length >= 2) {
      this.setState({location: query});
      console.log("searching for " + query)
    } else {
      console.log('add a word with at least 2 letters!');
    }
  }

  getLocation() {
    if(this.state.location) {
      return <GetLoc key={Math.random()} d={this.state} />
    }
  }

  render() {
    return (
      <div>
        <div className="title">
          Where will you meet your friends tonight? Enter your location!
        </div>
        <input id="q" onKeyDown={(key) => this.getKey(key)} placeholder="Paris"/>
        {this.getLocation()}
      </div>
    )
  }
}