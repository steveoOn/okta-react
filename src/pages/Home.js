import React from "react";
import { Link } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import { useAuthenticated } from "../container/useAuthenticated";
import { useFetch } from "../container/useFetch";

function Home({ auth }) {
  const isAuth = useAuthenticated(auth.isAuthenticated);

  const authApi = useFetch("/api/auth", auth.getAccessToken);

  if (isAuth === null) return null;

  const button = isAuth ? (
    <button
      onClick={() => {
        auth.logout();
      }}
    >
      Logout
    </button>
  ) : (
    <button
      onClick={() => {
        auth.login();
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
