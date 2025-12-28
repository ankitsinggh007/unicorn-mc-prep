export default function TodoList({
  todoLists,
  setToggle,
  type,
  setEditTodo,
  setDeleteTodo,
}) {
  return (
    <ol className="divide-y divide-black-200 rounded border p-2">
      {todoLists.length === 0 && <span> No todos to show...</span>}
      {todoLists.length > 0 &&
        todoLists.map((todo) => {
          return (
            <li
              key={todo.id}
              className="flex justify-between items-center gap-2 m-2 "
            >
              <input
                type="checkbox"
                className="flex items-center gap-2 cursor-pointer"
                onChange={() => setToggle(todo.id)}
                value={todo.label}
                checked={todo.isComplete}
              />
              <span className="flex-1 truncate">{todo.label}</span>

              <button
                className="px-3 py-1.5 rounded-md bg-green-400 hover:bg-green-500"
                aria-label="edit-todo"
                onClick={() => setEditTodo(todo)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1.5 bg-gray-400 rounded-md hover:bg-gray-500"
                aria-label="delete-todo"
                disabled={type && type.id === todo.id}
                onClick={() => setDeleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          );
        })}
    </ol>
  );
}
