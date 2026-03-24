import { useState } from "react";
import FolderView from "./components/FolderView.jsx";

const TREE = {
  id: "root",
  name: "root",
  type: "folder",
  children: [
    {
      id: "f1",
      name: "src",
      type: "folder",
      children: [
        { id: "file1", name: "App.jsx", type: "file" },
        { id: "file2", name: "Modal.jsx", type: "file" },
      ],
    },
    {
      id: "f2",
      name: "public",
      type: "folder",
      children: [{ id: "file3", name: "index.html", type: "file" }],
    },
    { id: "file4", name: "package.json", type: "file" },
    { id: "f3", name: "empty-folder", type: "folder", children: [] },
  ],
};
function App() {
  const [expand, setExpand] = useState([]);
  const [highlight, setHighlight] = useState(-1);

  let expandHandler = (id) => {
    setExpand((prev) => {
      let temp = [...prev];
      if (temp.includes(id)) {
        temp = temp.filter((obj) => {
          return obj !== id;
        });
        return temp;
      } else return [...temp, id];
    });
  };
  console.log(highlight, "highlight");
  return (
    <main>
      <h1>File Explorer</h1>
      {TREE === null && <p>tree is empty</p>}
      {TREE !== null && TREE?.type === "folder" ? (
        <FolderView
          child={TREE?.children}
          key={TREE?.id}
          id={TREE?.id}
          name={TREE?.name}
          expand={expand}
          onExpand={expandHandler}
          onHighlight={setHighlight}
          highlight={highlight}
        />
      ) : (
        <FileView
          name={TREE.name}
          id={TREE.id}
          key={TREE.id}
          highlight={highlight}
          onHighlight={setHighlight}
        />
      )}
    </main>
  );
}

export default App;

export function FileView({ name, id, highlight, onHighlight }) {
  return (
    <div
      style={{
        marginLeft: "1rem",
        backgroundColor: `${highlight === id ? "blue" : "transparent"}`,
      }}
      onClick={() => onHighlight(id)}
    >
      <button type="button">{`📄 ${name}`}</button>
    </div>
  );
}
