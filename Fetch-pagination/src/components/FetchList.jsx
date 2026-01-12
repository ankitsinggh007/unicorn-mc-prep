import React from "react";

function FetchList({ paginatedUser, inputTerm }) {
  return (
    <section className="h-78 w-full overflow-x-auto border rounded-md">
      <button className="px-2 "> </button>

      {inputTerm && paginatedUser.length === 0 && (
        <p className="text-center m-auto py-10 text-gray-500">
          No users found.
        </p>
      )}
      {paginatedUser.length > 0 && (
        <table
          aria-live="polite"
          className="w-full table-fixed border-collapse text-sm"
        >
          <thead className="bg-gray-100 border-b">
            <tr className="h-12 text-left">
              <th scope='col' className="px-4">Name</th>
              <th scope='col' className="px-4">Email</th>
              <th scope='col' className="px-4">Phone</th>
              <th scope='col' className="px-4">City</th>
            </tr>
          </thead>
          <tbody className="align-top">
            {paginatedUser.map((user) => (
              <tr key={user.id} className="h-12 border-b">
                <td className="px-4 truncate">{user.name}</td>
                <td className="px-4 truncate">{user.email}</td>
                <td className="px-4">{user.phone}</td>
                <td className="px-4">{user.address.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default FetchList;
