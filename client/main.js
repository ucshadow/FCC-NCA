import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.jsx';
import Home from '../imports/ui/Home.jsx';
import About from '../imports/ui/About.jsx';
import NotFound from '../imports/ui/NotFound.jsx';


export const renderRoutes = () => (
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ Home } />
      <Route path="about" component={ About } />
      <Route path="*" component={ NotFound } />
    </Route>
  </Router>
);


Meteor.startup(() => {

  render(renderRoutes(), document.getElementById('app'));

});