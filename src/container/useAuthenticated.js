import { useState, useEffect } from "react";

export function useAuthenticated(parentProps) {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    async function checkAuthentication() {
      const isAuthenticated = await parentProps.isAuthenticated();
      if (isAuthenticated !== authenticated) {
        setAuthenticated(isAuthenticated);
      }
    }

    checkAuthentication();
  });

  return authenticated;
}
