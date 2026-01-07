import { useCallback, useEffect, useRef, useState } from "react";

const useFetch = (api, deps = []) => {
  let [loader, setLoader] = useState(true);
  let [error, setError] = useState(null);
  let [data, setData] = useState([]);

  let controller = useRef(null);

  let fetchData = useCallback(async () => {
    controller.current?.abort();
    controller.current = new AbortController();
    try {
      setLoader(true);
      setError(null);
      let response = await fetch(api, { signal: controller.current.signal });

      if (!response.ok) {
        throw new Error("Failed to fetch data HTTP status " + response.status);
      }

      if (response.status >= 400 && response.status < 500) {
        throw new Error("Client Error, please check your request");
      }
      if (response.status >= 500) {
        throw new Error("Server is down, try again later");
      }

      let data = await response.json();

      if (controller.current.signal.aborted) {
        return;
      }
      setData(data);
    } catch (err) {
      if (err.name === "AbortError") {
        return;
      }
      setError(err);
    } finally {
      if (!controller.current.signal.aborted) setLoader(false);
    }
  }, [api]);

  useEffect(() => {
    fetchData();
    return () => {
      controller.current?.abort();
    };
  }, [fetchData, ...deps]);

  return { loader, error, data, refetch: fetchData };
};
export default useFetch;
