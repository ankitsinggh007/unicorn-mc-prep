import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useCallback, useEffect, useRef } from "react";

export default function UserModal() {
  const { id } = useParams();
  const navigate = useNavigate();
  let modalRef = useRef(null);
  let previousActiveElement = useRef(null);
  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape") {
        navigate(-1);
      }
    },
    [navigate]
  );
  const handleTabKey = useCallback((e) => {
    if (e.key !== "Tab") return;

    const focusableElements = modalRef.current.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
    );

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    console.log(document.activeElement);
    previousActiveElement.current = document.activeElement;
    // Move focus into modal on open
    modalRef.current?.focus();

    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
      previousActiveElement.current?.focus(); // Return focus to previous element on close
    };
  }, [handleEscape]);

  const {
    data: user,
    loader,
    error,
  } = useFetch(`https://jsonplaceholder.typicode.com/users/${id}`);

  return (
    <div
      onClick={() => navigate(-1)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-modal-title"
        onKeyDown={handleTabKey}
        className="bg-white p-4 rounded shadow-lg min-w-[300px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => navigate(-1)}
          className="absolute top-2 right-2 text-sm text-gray-500"
        >
          ✕
        </button>

        {loader && (
          <p role="status" aria-live="polite">
            Loading user...
          </p>
        )}

        {error && <p className="text-red-500">{error}</p>}

        {user && !loader && !error && (
          <>
            <h2 id="user-modal-title" className="text-lg font-bold mb-2">
              User Details
            </h2>
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
