import React, { useEffect } from "react";

export default function UserDetail({ user }) {
  return (
    <div>
      {user ? (
        <div className="border p-4 rounded mt-4 w-full max-w-md">
          <h2 className="text-xl font-bold mb-2">User Details</h2>
          <p>
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>
          <p>
            <span className="font-semibold">Website:</span> {user.website}
          </p>
        </div>
      ) : (
        <p className="mt-4">No user selected</p>
      )}
    </div>
  );
}
