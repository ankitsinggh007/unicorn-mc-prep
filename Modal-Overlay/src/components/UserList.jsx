import { useNavigate } from "react-router-dom";

export default function UserList({ users, loader, error }) {
  const navigate = useNavigate();

  return (
    <section className="relative flex flex-col gap-4 p-4 m-4 border">
      <h2 className="self-center">User List</h2>

      {loader && (
        <div className="w-8 h-8 border-4 border-t-transparent border rounded-full animate-spin self-center"></div>
      )}

      {Array.isArray(users) && (
        <div className="flex flex-wrap gap-2">
          {users.map((user) => (
            <div
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
            </div>
          ))}
        </div>
      )}

      {error && <div className="text-red-500">Error: {error}</div>}
    </section>
  );
}
