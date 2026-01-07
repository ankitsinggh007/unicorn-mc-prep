import { useState, useMemo, useEffect } from "react";
import FetchForm from "./components/FetchForm";
import FetchPagination from "./components/FetchPagination";
import FetchList from "./components/fetchList";
import useFetch from "./hooks/useFetch";
const API = `https://jsonplaceholder.typicode.com/users`;
function App() {
  let [isSorted, setIsSorted] = useState(false);
  let [inputTerm, setInputTerm] = useState("");
  let [currentPage, setCurrentPage] = useState(1);
  let itemsPerPage = 5;

  let { loader, error, data: userList, refetch: fetchData } = useFetch(API);
  useEffect(() => {
    setCurrentPage(1);
  }, [inputTerm]);
  let filteredList = useMemo(() => {
    let data = [...userList];
    return isSorted
      ? [...userList].sort((a, b) => a.name.localeCompare(b.name))
      : data;
  }, [isSorted, userList]);

  filteredList = filteredList.filter(
    (user) =>
      user.name.toLowerCase().includes(inputTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(inputTerm.toLowerCase())
  );

  let paginated = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  console.log(userList, "user");

  return (
    <main className="m-auto p-1 flex flex-col justify-evenly items-center gap-4 w-2xl">
      <FetchForm onSearchChange={setInputTerm} />
      <section className="flex flex-col justify-between items-center gap-4 w-full">
        {loader ? (
          <h2 className="animate-spin h-5 w-5 rounded-full border border-t-transparent"></h2>
        ) : error ? (
          <h2 className="text-red-500">
            Error: {error.message}
            <button
              onClick={fetchData}
              className="bg-red-500 hover:bg-red-600 text-white p-2 py-1"
            >
              try again
            </button>
          </h2>
        ) : (
          <>
            <button
              onClick={() => setIsSorted(!isSorted)}
              className={`p-2 py-1 mb-2 ${
                isSorted ? "bg-blue-500" : "bg-gray-500"
              } text-white rounded-md`}
            >
              {isSorted ? "Sort ↓" : "Sort ↑"}
            </button>
            <FetchList paginatedUser={paginated} inputTerm={inputTerm} />

            <FetchPagination
              currPage={currentPage}
              onSetCurrPage={setCurrentPage}
              filteredUser={filteredList}
              itemsPerPage={itemsPerPage}
            />
          </>
        )}
      </section>
    </main>
  );
}

export default App;
