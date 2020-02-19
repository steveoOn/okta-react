import React from "react";
import { Link } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import { useAuthenticated } from "../container/useAuthenticated";

function Home(props) {
  const isAuth = useAuthenticated(props.auth);

  if (isAuth === null) return null;

  const button = isAuth ? (
    <button
      onClick={() => {
        props.auth.logout();
      }}
    >
      Logout
    </button>
  ) : (
    <button
      onClick={() => {
        props.auth.login();
      }}
    >
      Login
    </button>
  );

  return (
    <div>
      <Link to='/'>Home</Link>
      <br />
      <Link to='/protected'>Protected</Link>
      <br />
      {button}
    </div>
  );
}

export default withAuth(Home);
