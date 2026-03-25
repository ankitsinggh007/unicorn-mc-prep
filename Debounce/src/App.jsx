import { useCallback, useRef, useEffect, useState } from "react";
import { DebounceWrapper } from "./utils/lodash.js";

const BASE_URL = `https://dummyjson.com/`;
function App() {
  const [search, setSearch] = useState("");
  const abortRef = useRef(null);

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const debounce = useRef(null);
  let searchProduct = async (query = "") => {
    try {
      abortRef.current?.abort();
      abortRef.current = new AbortController();
      setLoader(true);
      setError(null);

      let response = await fetch(`${BASE_URL}products/search?q=${query}`, {
        signal: abortRef.current.signal,
      });

      if (!response.ok) throw new Error(`ERROR_STATUS:${response.status}`); // wich one error to use Error or error.

      let temp = await response.json();
      setData(temp?.products || []);
    } catch (error) {
      if (error.name === "AbortError") return;
      setError(error?.message || "try again");
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    debounce.current = DebounceWrapper(searchProduct, 300);

    return () => {
      debounce.current.Cancel();
      abortRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    debounce.current.DebouncedFn(search?.trim()?.toLowerCase());
  }, [search]);

  let query = "search";
  let retry = () => {
    debounce.current.DebouncedFn(search.trim().toLowerCase());
  };

  return (
    <main>
      <div>
        <h4>Debounce</h4>
        <input
          type="text"
          placeholder="search with product name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div></div>

      <div>
        {loader && <p>loading ...</p>}

        {!loader && error && (
          <>
            <button onClick={() => retry()}> try Again</button>
            <p>{error}</p>
          </>
        )}
        {data.length === 0 && !loader && !error && <p>No product found</p>}

        {data.length > 0 && (
          <div>
            <h5>Products</h5>
            <span style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {data?.map((obj) => {
                return (
                  <div
                    key={obj.id}
                    style={{
                      width: "5rem",
                      height: "5rem",
                      padding: ".5rem",
                      border: "1px solid black",
                    }}
                  >
                    <p>{obj?.title}</p>
                  </div>
                );
              })}
            </span>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
