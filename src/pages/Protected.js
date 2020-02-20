import React from "react";

const Protected = () => {
  const data = JSON.parse(localStorage.getItem("okta-token-storage"));

  return (
    <div>
      <h1>Hello,{data.idToken.claims.email}</h1>
      <hr />
      <p>The Okta User Token is: </p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Protected;
