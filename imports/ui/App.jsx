import React from 'react'
import { render } from 'react-dom'

import { Link } from 'react-router'
import AccountsUIWrapper from './AccountsUIWrapper.jsx';


export default class App extends React.Component {

  constructor() {
    super();
    Meteor.call("changeName", function(err, res) {
      if(res) {
        document.getElementById("login-name-link").innerHTML = res;
      }
    })
  }

  render() {
    return (
      <div>
        <div className="whole-nav">
          <nav role="navigation" className="navbar navbar-default" style={{
          background: "none", border: "none"}}>
            <div id="navbarCollapse" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li className="nav-button"><Link to="/about"> About </Link></li>
                <li className="nav-account" id="login"><AccountsUIWrapper /></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">

              </ul>
            </div>
          </nav>
      </div>
        {this.props.children}
      </div>
    )
  }
}