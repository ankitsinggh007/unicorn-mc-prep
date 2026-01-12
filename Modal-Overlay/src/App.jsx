import { Routes, Route } from "react-router-dom";
import UserList from "./components/UserList.jsx";
import UserModal from "./components/UserModal.jsx";
import useFetch from "./hooks/useFetch.jsx";

const API = "https://jsonplaceholder.typicode.com/users";

function App() {
  const { data, loader, error } = useFetch(API);
  return (
    <Routes>
      {/* List route */}
      <Route
        path="/"
        element={<UserList users={data} loader={loader} error={error} />}
      />

      {/* Modal route (URL-driven) */}
      <Route
        path="/:id"
        element={
          <>
            <UserList users={data} loader={loader} error={error} />
            <UserModal />
          </>
        }
      />
    </Routes>
  );
}

export default App;
