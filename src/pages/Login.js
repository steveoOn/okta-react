import React from "react";
import { Redirect } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import LoginForm from "../components/LoginForm";
import { useAuthenticated } from "../container/useAuthenticated";

function Login(props) {
  const authenticated = useAuthenticated(props.auth);

  if (authenticated === null) return null;

  return authenticated ? (
    <Redirect to='/' />
  ) : (
    <LoginForm baseUrl={props.baseUrl} />
  );
}

export default withAuth(Login);
