import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

function SearchUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // debounce input
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => clearTimeout(id);
  }, [searchTerm]);

  const API = debouncedTerm
    ? `https://api.github.com/search/users?q=${debouncedTerm}`
    : null;

  const { data, loader, error } = useFetch(API, [debouncedTerm]);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search GitHub users"
      />

      {loader && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.login}</li>
        ))}
      </ul>
    </div>
  );
}
export default SearchUsers;
