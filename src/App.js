import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./services/history";
import ScrollToTop from "./ScrollToTop";

import Home from "./components/Home";
import Users from "./components/Users";
import Manage from "./components/Manage";

const App = props => (
  <Router history={history}>
    <ScrollToTop>
      <Switch>
        <Route exact path="/users/:usertype" component={Users} />
        <Route
          exact
          path="/users/:usertype/:uid/:displayName"
          component={Manage}
        />
        <Route exact path="/" component={Home} />
      </Switch>
    </ScrollToTop>
  </Router>
);

export default App;
