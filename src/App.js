import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";
import Home from "./pages/Home";
import Protected from "./pages/Protected";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Security
          issuer='https://dev-134053.okta.com/oauth2/default'
          clientId='0oa2bibdf6J19GbEj4x6'
          redirectUri={window.location.origin + "/implicit/callback"}
          onAuthRequired={({ history }) => history.push("/login")}
          pkce={true}
        >
          <Route path='/' exact component={Home} />
          <SecureRoute path='/protected' component={Protected} />
          <Route
            path='/login'
            render={() => <Login baseUrl='https://dev-134053.okta.com' />}
          />
          <Route path='/implicit/callback' component={ImplicitCallback} />
        </Security>
      </Switch>
    </Router>
  );
}

export default App;
