import { useNavigate } from "react-router-dom";

export default function UserList({ users, loader, error }) {
  const navigate = useNavigate();

  return (
    <section
      aria-labelledby="user-list-heading"
      className=" flex flex-col  gap-4 p-4 m-4 "
    >
      <h2 id="user-list-heading" className="self-center">
        User List
      </h2>

      {loader && (
        <p
          role="status"
          aria-live="polite"
          className="w-8 h-8 border-4 border-t-transparent border rounded-full animate-spin self-center "
        >
          <span className="sr-only">Loading users…</span>
        </p>
      )}

      {Array.isArray(users) && (
        <div className="flex flex-wrap gap-4 px-4 py-2 bg-white-100">
          {users.map((user) => (
            <button
              key={user.id}
              className="border min-w-76 px-4 py-2 flex flex-col gap-1 cursor-pointer bg-white hover:bg-blue-50"
              onClick={() => navigate(`/${user.id}`)}
            >
              <div>
                <span className="font-semibold">Name:</span> {user.name}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {user.email}
              </div>
              <div>
                <span className="font-semibold">City:</span>{" "}
                {user?.address?.city}
              </div>
            </button>
          ))}
        </div>
      )}

      {error && <div className="text-red-500">Error: {error}</div>}
    </section>
  );
}
