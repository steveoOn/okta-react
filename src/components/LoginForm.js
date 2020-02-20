import React, { useState, useRef } from "react";
import OktaAuth from "@okta/okta-auth-js";
import { withAuth } from "@okta/okta-react";
import { useForm } from "../container/useForm";

function LoginForm(props) {
  const [sessionToken, setSessionToken] = useState(null);
  const [value, getValue] = useForm({
    username: "",
    password: ""
  });

  const oktaAuth = new OktaAuth({ url: props.baseUrl });

  function handleSubmit(e) {
    e.preventDefault();
    oktaAuth
      .signIn({
        username: value.username,
        password: value.password
      })
      .then(res => setSessionToken(res.sessionToken))
      .catch(err => console.log("Found an error", err));
  }

  if (sessionToken) {
    props.auth.redirect({ sessionToken });
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          id='username'
          type='text'
          value={value.username}
          onChange={getValue}
        />
        Password:
        <input
          id='password'
          type='password'
          value={value.password}
          onChange={getValue}
        />
      </label>
      <input id='submit' type='submit' value='Submit' />
    </form>
  );
}

export default withAuth(LoginForm);
