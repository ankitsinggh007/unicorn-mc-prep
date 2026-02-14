import React from "react";

function FeedList({
  loader,
  moreError,
  error,
  recipes,
  moreLoader,
  retryFetchData,
  retryMoreFetchData,
}) {
  let firstScreen = null;

  if (loader) {
    firstScreen = (
      <div className="animate-spin  border-2 border-t-transparent rounded-full w-6 h-6" />
    );
  }
  if (error) {
    firstScreen = (
      <div className="flex flex-col  items-center">
        <button
          className="px-2 py-1 text-white bg-red-600 hover:bg-red-700 rounded "
          onClick={retryFetchData}
        >
          Try Again{" "}
        </button>
        <span>{error}</span>
      </div>
    );
  }
  let footer = null;
  if (moreLoader) {
    footer = (
      <div className="animate-spin  border-2 border-t-transparent rounded-full w-6 h-6" />
    );
  }
  if (moreError) {
    footer = (
      <div className="flex flex-col  items-center">
        <button
          className="px-2 py-1 text-white bg-red-600 hover:bg-red-700 rounded "
          onClick={retryMoreFetchData}
        >
          Try Again{" "}
        </button>
        <span>{moreError}</span>
      </div>
    );
  }

  return (
    <div className="p-4 m-auto items-center gap-2 flex flex-col ">
      {firstScreen}

      <ul className="border-red-200 w-full">
        {!loader &&
          !error &&
          recipes.length > 0 &&
          recipes.map((r) => {
            return (
              <li className="p-2 border rounded   " key={r.id}>
                <div>{r.name}</div>
                <span>{r.cuisine}</span>・<span>{r.difficulty}</span>
              </li>
            );
          })}
        {!loader && !error && recipes.length === 0 && (
          <li className="p-2 border rounded text-center">No Recipes Found </li>
        )}
      </ul>

      {footer}
    </div>
  );
}

export default FeedList;
