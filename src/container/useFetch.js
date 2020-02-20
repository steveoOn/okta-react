import { useEffect, useState } from "react";

export function useFetch(url, getAccessToken) {
  const [state, setState] = useState({
    token: null,
    data: null
  });

  useEffect(() => {
    async function getToken() {
      try {
        const token = await getAccessToken();

        const result = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await result.json();

        setState({
          token,
          data
        });
      } catch (error) {
        console.log("error", error.message);
      }
    }

    getToken();
  }, [url, getAccessToken]);

  return state;
}
