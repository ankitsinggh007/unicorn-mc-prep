import { useEffect, useState } from "react";

export default function TodoForm({ onAdd, editTodo, onEdit }) {
  const [todo, setTodo] = useState("");

  useEffect(() => {
    if (editTodo) {
      setTodo(editTodo.label);
    }
  }, [editTodo]);

  const handleTodo = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;
    if (editTodo) {
      let updatedTodo = {
        ...editTodo,
        label: todo.trim(),
      };
      onEdit(updatedTodo);
      setTodo("");
      return;
    }
    let temp = {
      id: Date.now(),
      label: todo.trim(),
      isComplete: false,
    };
    onAdd(temp);
    setTodo("");
  };

  return (
    <form onSubmit={handleTodo} className=" flex  justify-evenly flex-wrap ">
      <input
        type="text"
        className="px-2 py-1  border rounded  focus:outline-none  md:w-2/3 "
        placeholder="add Todo..."
        aria-label="input todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        className="px-3 py-1.5 rounded-md text-white bg-blue-600 hover:bg-blue-700  md:1/3 "
        type="submit"
        aria-label={editTodo ? "edit-todo" : "add-todo"}
      >
        {!editTodo ? "Add  Todo" : "Edit Todo"}
      </button>
    </form>
  );
}

//as we are using input field does that mean i need to use form as wrapper as best practices?
//did i follow all best practice in each manner hence interviewer never get disappoint on any part of implementation?
