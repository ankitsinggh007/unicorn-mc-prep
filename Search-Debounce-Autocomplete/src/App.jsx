import { useState, useEffect, useRef } from "react";
import useFetch from "./hooks/useFetch";
import SearchBox from "./components/SearchBox";
import UserDetail from "./components/UserDetail";
import SearchUsers from "./components/Home";
const API = "https://jsonplaceholder.typicode.com/users";
function App() {
  let [searchTerm, setSearchTerm] = useState("");
  let [user, setUser] = useState(null);
  let [suggestions, setSuggestions] = useState([]);
  let { loader, data, error, refetch } = useFetch(API);

  let debounceRef = useRef();

  useEffect(() => {
    if (searchTerm === "") {
      setSuggestions([]);
      return;
    }
    let id = setTimeout(() => {
      let filteredUser = data.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredUser);
    }, 300);

    return () => clearTimeout(id);
  }, [searchTerm, data]);

  let fetchUser = (name) => {
    let selectedUser = data.find(
      (user) => user.name.toLowerCase() === name.toLowerCase()
    );
    console.log(selectedUser, "selectedUser");
    setSuggestions([]);
    setUser(selectedUser || {});
    setSearchTerm(name);
  };

  return (
    <>
      {/* <SearchUsers /> */}
      <SearchBox
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        suggestions={suggestions}
        fetchUser={fetchUser}
      />
      <UserDetail user={user} />
    </>
  );
}
export default App;
