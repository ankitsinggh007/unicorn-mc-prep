import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import useLocalStorage from "./hooks/useLocalStorge";
function App() {
  const [todoLists, setTodoLists] = useLocalStorage("todos", []);
  const [editTodoObj, setEditTodoObj] = useState(null);
  //alwasy use camel case for naming convention in js and react
  //Rename setToggle → onToggle and setDeleteTodo → onDelete for semantic clarity.
  const editTodo = (updatedTodo) => {
    let temp = [...todoLists];
    //if possible not use forEach rather use map reason :-immutability
    temp.forEach((todo) => {
      if (todo.id === updatedTodo.id) {
        todo.label = updatedTodo.label;
      }
    });
    setTodoLists(temp);
    setEditTodoObj(null);
  };

  const addTodo = (todo) => {
    let temp = [...todoLists, todo];
    setTodoLists(temp);
  };
  // const EditTodo = () => {};
  const deleteTodo = (id) => {
    let temp = todoLists.filter((todo) => todo.id !== id);
    setTodoLists(temp);
  };
  const handleToggle = (id) => {
    let temp = [...todoLists];
    //if possible not use forEach rather use map reason :-immutability
    temp.forEach((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
    });
    setTodoLists(temp);
  };
  return (
    // Rename prop handlers for consistency → React convention prefers onSomething
    <main className="max-w-xl mx-auto p-4 flex flex-col gap-4 ">
      <TodoForm editTodo={editTodoObj} onAdd={addTodo} onEdit={editTodo} />
      <TodoList
        todoLists={todoLists}
        type={editTodoObj}
        setEditTodo={setEditTodoObj}
        setToggle={handleToggle}
        setDeleteTodo={deleteTodo}
      />
    </main>
  );
}

export default App;
