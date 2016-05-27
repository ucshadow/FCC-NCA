import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data';

import { GoingOut } from '../api/userStatus';


export default class DisplayLocs extends Component {

  constructor(props) {
    super(props);

    console.log('rendered');

    this.addToLocation = this.addToLocation.bind(this);
    this.addLocal = this.addLocal.bind(this);
    this.whoGoesHere = this.whoGoesHere.bind(this);
    this.clearList = this.clearList.bind(this);
  }

  addToLocation(n) {
    if(Meteor.user()) {
      Meteor.call("goingOut.addMe", Meteor.user()._id, n, function(err, res) {
        if(err) {console.log(err)}
      });
    }
  }

  addLocal(location) {
    for(let i = 0; i < this.props.l.length; i++) {
      if(this.props.l[i].location === location) {
        return this.props.l[i].here.length
      }
    }
    return 0
  }

  whoGoesHere(location) {
    for(let i = 0; i < this.props.l.length; i++) {
      if(this.props.l[i].location === location) {
        $("#who-" + this.props.ID).text(this.props.l[i].here.join(", "));
      }
    }
  }

  clearList() {
    $("#who-" + this.props.ID).text("");
  }

  render() {
    return (
        <div className="container">
          <div className="media">
             <a className="pull-left"
                href={this.props.d.venue.url ? this.props.d.venue.url: null} target="_blank">
                <img className="media-object" src={this.props.d.venue.photos.groups[0] ?
                this.props.d.venue.photos.groups[0].items[0].prefix + "200x200" +
                this.props.d.venue.photos.groups[0].items[0].suffix : "/pics/mongo.png"
                } alt="Media Object" />
             </a>
             <div className="media-body">
                <div className="media-heading">

                  <button className="here-now-button" onClick={() => this.addToLocation(this.props.d.venue.name)}
                  id={"button-" + this.props.ID}>
                    {(this.props.d.venue.hereNow["count"] +
                      this.addLocal(this.props.d.venue.name)) + " GOING"}
                  </button>
                  <button className="who-is-here-button" onMouseEnter={() => this.whoGoesHere(this.props.d.venue.name)}
                  onMouseLeave={this.clearList}>
                    who
                  </button>

                  <AmI key={Math.random()} l={this.props.d.venue.name} u={Meteor.userId()} />

                </div>
               <br />
               <div className="location-name">
                 {this.props.d.venue.name}
               </div>
               <div className="location-description">
                {this.props.d.tips ? this.props.d.tips[0].text : "No description"}
               </div>
               <div className="location-likes">
                 {this.props.d.tips ? (this.props.d.tips[0].likes ? this.props.d.tips[0].likes.summary : "0 likes") : "-"}
               </div>
               <div className="location-type">
                 type: {this.props.d.venue.categories ? this.props.d.venue.categories[0].name : "-"}
               </div>
               <div className="location-address">
                 Address: {this.props.d.venue.location.formattedAddress.join(" ")}
               </div>
               <div className="location-rating">
                 rating: {this.props.d.venue.rating}
               </div>
             </div>
            <div id={"who-" + this.props.ID} className="who-list">
            </div>
          </div>
        </div>
    )
  }
}


class AmI extends Component {

  constructor(props) {
    super(props);
    this.state = {s: false};
  }

  componentDidMount() {
    Meteor.call("amI", this.props.u, this.props.l, function(err, res){
      if(err) {console.log(err)}
      if(res) {
        return this.setState({s: true})
      } else {
        return this.setState({s: false})
      }
    }.bind(this))
  }

  render() {
    if(this.state.s) {
      return (
        <button className="going">
          going
        </button>
      )
    } else {
      return <div></div>
    }
  }
}