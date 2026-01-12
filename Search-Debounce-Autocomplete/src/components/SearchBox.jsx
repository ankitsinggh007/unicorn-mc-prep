import { useEffect, useState } from "react";

export default function SearchBox({
  suggestions,
  fetchUser,
  searchTerm,
  setSearchTerm,
}) {
  let [suggestionAppear, setSuggestionAppear] = useState(false);

  return (
    <div className="">
      <input
        type="text"
        onFocus={() => setSuggestionAppear(true)}
        onBlur={() => setTimeout(() => setSuggestionAppear(false), 100)}
        className="border px-2 py-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-400"
        value={searchTerm}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            fetchUser(searchTerm);
          }
        }}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name"
      />

      {suggestions.length > 0 && suggestionAppear && (
        <ul className="divide-y w-full divide-gray-200 p-1 absolute max-h-52 overflow-x-auto border">
          {suggestions.map((suggestions) => (
            <li
              className="px-4 py-2 bg-gray-50 hover:bg-white "
              key={suggestions.id}
              onClick={() => fetchUser(suggestions.name)}
            >
              {suggestions.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
