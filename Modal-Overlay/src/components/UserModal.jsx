import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function UserModal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: user,
    loader,
    error,
  } = useFetch(`https://jsonplaceholder.typicode.com/users/${id}`);

  return (
    <div
      onClick={() => navigate(-1)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <div
        className="bg-white p-4 rounded shadow-lg min-w-[300px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => navigate(-1)}
          className="absolute top-2 right-2 text-sm text-gray-500"
        >
          ✕
        </button>

        {loader && <p>Loading user...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {user && !loader && !error && (
          <>
            <h2 className="text-lg font-bold mb-2">User Details</h2>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>City:</strong> {user.address?.city}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
