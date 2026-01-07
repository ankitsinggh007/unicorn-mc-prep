function FetchForm({ onSearchChange }) {
  return (
    <form
      className="mb-4 w-full flex justify-center "
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="search user by name / email"
        className="px-2 py-1 w-2/3  rounded border focus:outline-none focus:ring-1 focus:ring-blue-400 mr-2"
      />
    </form>
  );
}

export default FetchForm;
