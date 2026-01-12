import { useCallback, useEffect, useRef, useState } from "react";

let useFetch = (API, dep = []) => {
  let [data, setData] = useState(null);
  let [error, setError] = useState(null);
  let [loader, setLoader] = useState(false);
  let Controller = useRef();

  let fetchFun = useCallback(async () => {
    if (Controller.current) Controller.current.abort();
    try {
      Controller.current = new AbortController();
      setLoader(true);
      setError(null);

      let response = await fetch(API, { signal: Controller.current.signal });
      if (!response.ok) {
        if (response.status === 400 || response.status === 404) {
          throw Error("Bad Request/ Invalid Request");
        }
        if (response.status === 401 || response.status === 403) {
          throw Error("Please login again");
        }
        if (response.status >= 500) {
          throw Error("Server Error, please try later");
        }
      }
      response = await response.json();
      setData(response || null);
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(err.message);
    } finally {
      setLoader(false);
    }
  }, [API]);

  useEffect(() => {
    fetchFun();
    return () => {
      if (Controller.current) Controller.current.abort();
    };
  }, [fetchFun, ...dep]);

  return { data, error, loader, refetch: fetchFun };
};
export default useFetch;
