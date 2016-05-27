import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import cred from '../api/logStuff.js';

import DisplayLocs from '../ui/DisplayLoc.jsx';
import { GoingOut } from '../api/userStatus';

export default class GetLoc extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.goingOut);

    this.state = {res: null};
    this.displayLocs = this.displayLocs.bind(this);
    this.queryLocs = this.queryLocs.bind(this);
    this.changeState = this.changeState.bind(this);
    this.queryLocs();
  }

  queryLocs() {
    let localCS = this.changeState;
    $.get(cred()[0] + this.props.d.location + cred()[1] + cred()[2] + cred()[3], function(res){
      if(res) {
        console.log(res.response);
        localCS(res.response);
      } else {
        console.log("error receiving data");
      }
    });
  }

  displayLocs() {
    return this.state.res.groups[0].items.map((loc) => {
      return <DisplayLocs key={Math.random()} d={loc} l={this.props.goingOut}
                          ID={this.state.res.groups[0].items.indexOf(loc)}/>
    })
  }

  changeState(x) {
    this.setState({res: x})
  }

  render() {
    return (
      <div className="all-locations">
        {this.state.res ? this.displayLocs() : this.props.d.location}
      </div>
    )
  }
}



GetLoc.propTypes = {
  goingOut: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('goingOut');
  return {
    goingOut: GoingOut.find({}).fetch()
  };
}, GetLoc);