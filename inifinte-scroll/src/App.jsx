import React, { useRef, useState, useEffect, useCallback } from "react";
import FeedList from "./FeedList";

const BASE_URL = "https://dummyjson.com/recipes";
const LOAD_MORE_TRIGGER_THRESHOLD = 0.2;
const itemPerPage = 10;
function App() {
  let [loader, setLoader] = useState(false);
  let [error, setError] = useState(null);
  let [recipes, setRecipes] = useState([]);
  let [hasMore, setHasMore] = useState(false);
  let [page, setPage] = useState(0);
  let sentinalRef = useRef(null);
  let [moreError, setMoreError] = useState(null);
  let [moreLoader, setMoreLoader] = useState(false);
  let flightRef = useRef(false);
  let abortRefFirst = useRef(null);
  let abortRefScrollFetch = useRef(null);

  let fetchData = useCallback(async () => {
    let skip = page * itemPerPage;
    if (abortRefFirst?.current) abortRefFirst.current.abort();
    abortRefFirst.current = new AbortController();
    let signal = abortRefFirst.current.signal;
    setLoader(true);
    setError(null);
    try {
      let response = await fetch(
        `${BASE_URL}?limit=${itemPerPage}&skip=${skip}`,
        {
          signal,
        },
      );
      if (!response.ok) throw new Error(`Error Status : ${response.status}`);

      let data = await response.json();
      setRecipes(data?.recipes);
      setHasMore(skip + data?.recipes?.length < data?.total);
      setPage((prev) => prev + 1);
    } catch (error) {
      if (error.name === "AbortError") return;

      setError(error?.message || "Try Again");
    } finally {
      setLoader(false);
    }
  }, []); //still not give any guarantee that we will have the latest value of page as we are not adding page in dependency array because we don't want to refetch data on page change but we need the latest value of page in fetchData function, so we can use functional update of setState to get the latest value of page

  let retryFetchData = () => {
    setError(null);
    fetchData();
  };
  let retryMoreFetchData = () => {
    setMoreError(null);
    fetchMore();
  };

  useEffect(() => {
    fetchData();

    return () => {
      if (abortRefFirst?.current) abortRefFirst.current.abort();
    };
  }, []);

  const fetchMore = useCallback(async () => {
    if (flightRef.current) return;
    flightRef.current = true;
    if (abortRefScrollFetch?.current) abortRefScrollFetch.current.abort();
    abortRefScrollFetch.current = new AbortController();
    let signal = abortRefScrollFetch.current.signal;

    let skip = page * itemPerPage;
    setMoreError(null);
    setMoreLoader(true);
    try {
      let response = await fetch(
        `${BASE_URL}?limit=${itemPerPage}&skip=${skip}`,
        { signal },
      );
      if (!response.ok) throw new Error(`Error Status : ${response.status}`);
      let data = await response.json();
      setRecipes((prev) => [...prev, ...data?.recipes]);
      setHasMore(skip + data?.recipes?.length < data?.total);
      setPage((prev) => prev + 1);
    } catch (error) {
      if (error.name === "AbortError") return;
      setMoreError(error?.message || "Please Try Again");
    } finally {
      setMoreLoader(false);
      flightRef.current = false;
    }
  }, [page]);

  useEffect(() => {
    let observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return; //Only fetch when sentinel is actually visible
        if (!hasMore) return; //Don't fetch if there's no more data
        if (moreLoader) return;
        if (moreError) return;
        fetchMore();
      },
      {
        threshold: LOAD_MORE_TRIGGER_THRESHOLD,
      },
    );

    if (sentinalRef.current) observer.observe(sentinalRef.current);
    return () => {
      if (
        sentinalRef.current
      ) // though unobserve is not necessary as we are disconnecting the observer but it is a good practice to unobserve the observed element
      {
        observer.unobserve(sentinalRef.current);
      }
      observer.disconnect();
    };
  }, [hasMore, moreLoader, moreError, fetchMore]);

  useEffect(() => {
    return () => {
      abortRefScrollFetch.current?.abort();
    };
  }, []);

  return (
    <div>
      <FeedList
        moreError={moreError}
        loader={loader}
        error={error}
        moreLoader={moreLoader}
        recipes={recipes}
        retryFetchData={retryFetchData}
        retryMoreFetchData={retryMoreFetchData}
      />

      {!loader && !moreLoader && !error && !moreError && hasMore && (
        <div ref={sentinalRef} className="h-6 w-full flex justify-center">
          <span className="text-sm text-gray-500">Loading More...</span>
        </div>
      )}
      {!loader &&
        recipes.length !== 0 &&
        !moreLoader &&
        !error &&
        !moreError &&
        !hasMore && <p className="text-center text-gray-500">End of Page</p>}
    </div>
  );
}

export default App;
