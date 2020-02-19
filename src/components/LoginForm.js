import React, { useState } from "react";
import OktaAuth from "@okta/okta-auth-js";
import { withAuth } from "@okta/okta-react";

export default withAuth(function LoginForm(props) {
  const [state, setState] = useState({
    sessionToken: null,
    username: "",
    password: ""
  });

  const oktaAuth = new OktaAuth({ url: props.baseUrl });

  function handleSubmit(e) {
    e.preventDefault();
    oktaAuth
      .signIn({
        username: state.username,
        password: state.password
      })
      .then(res =>
        setState(state => ({
          ...state,
          sessionToken: res.sessionToken
        }))
      )
      .catch(err => console.log("Found an error", err));
  }

  const handleUsernameChange = e => {
    // if do not store e.target.value into the variable will cause an ERROR!!
    let val = e.target.value;
    setState(state => ({
      ...state,
      username: val
    }));
  };

  function handlePasswordChange(e) {
    let val = e.target.value;
    setState(state => ({
      ...state,
      password: val
    }));
  }

  if (state.sessionToken) {
    props.auth.redirect({ sessionToken: state.sessionToken });
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          id='username'
          type='text'
          value={state.username}
          onChange={handleUsernameChange}
        />
        Password:
        <input
          id='password'
          type='password'
          value={state.password}
          onChange={handlePasswordChange}
        />
      </label>
      <input id='submit' type='submit' value='Submit' />
    </form>
  );
});
