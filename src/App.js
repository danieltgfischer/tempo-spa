import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from './components/Main';

const App = () => (
  <Switch>
    <Route exact path="/:city" component={Main} />
    <Redirect from="/" to="/florianopolis" />
  </Switch>
);

export default App;
