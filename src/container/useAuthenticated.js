import { useState, useEffect } from "react";

export function useAuthenticated(authMethod) {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    async function checkAuthentication() {
      const isAuthenticated = await authMethod();
      if (isAuthenticated !== authenticated) {
        setAuthenticated(isAuthenticated);
      }
    }

    checkAuthentication();
  });

  return authenticated;
}
