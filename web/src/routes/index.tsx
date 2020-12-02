import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn/index';
import SignUp from '../pages/SignUp/index';
import Dashboard from '../pages/Dashboard/index';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signUp" exact component={SignUp} />
    <Route path="/dashboard" exact component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
