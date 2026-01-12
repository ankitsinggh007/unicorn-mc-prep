import { useCallback, useEffect, useRef, useState } from "react";
const useFetch = (API, dep = []) => {
  let [data, setData] = useState([]);
  let [error, setError] = useState(null);
  let [loader, setLoader] = useState(false);
  let controller = useRef();

  /*
useFetch
---------
Purpose:
- Centralized API handler for UI-safe data fetching
- Guarantees: UI never breaks, deterministic end state

Handles:
- Network errors (fetch throws) 
- HTTP errors (grouped: auth--401/403 / client--400/404 / server--500+)
- Abort stale requests (new call / unmount)
- Safe fallback if backend returns unexpected data

Returns:
- data      -> always safe to render
- error     -> user-friendly error message
- loader    -> request in progress
- refetch() -> manual retry trigger
*/

  const fetchFun = useCallback(async () => {
    try {
      // Abort previous in-flight request before starting a new one.
      // Prevents race conditions (e.g. fast typing / pagination).
      if (controller.current) controller.current.abort();

      /* AbortController return { 
      abort:fn () ,
       signal:{
        aborted:bool,
        onabort:fn,
        reason:any,} 
        } */

      controller.current = new AbortController();
      setLoader(true);
      setError(null);
      let response = await fetch(API, { signal: controller.current.signal });
      if (!response.ok) {
        // fetch resolves for 4xx/5xx as well.
        // response.ok === false means HTTP-level failure,
        // so we classify errors by status instead of parsing body.
        if (response.status === 400 || response.status === 404)
          throw Error("Invalid Request / Not Found");
        if (response.status >= 500) throw Error("Server error try later");
        if (response.status === 401 || response.status === 403)
          throw Error("Please login again");
      }
      response = await response.json();
      // Abort can throw AbortError during fetch OR during response.json().
      // In both cases, execution jumps to catch,
      // so no extra signal.aborted check is required.
      // Backend might return unexpected shape.
      // Fallback ensures UI never crashes on .map().
      Array.isArray(response) ? setData(response) : setData([]);
    } catch (error) {
      // AbortError is expected during refetch/unmount.
      // It should not surface as a user-facing error.
      if (error.name === "AbortError") return;
      setError(error.message);
    } finally {
      setLoader(false);
    }
  }, [API]);
  useEffect(() => {
    fetchFun();
    return () => controller.current?.abort();
  }, [fetchFun, ...dep]);
  return { data, error, loader, refetch: fetchFun };
};

export default useFetch;
