import { useEffect, useState, useRef } from "react";
import FileUpload from "./components/FileUpload";
import PreviewCard from "./components/PreviewCard";
function App() {
  const [selectedFile, setSelectedFile] = useState([]);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const latestFile = useRef(selectedFile);

  useEffect(() => {
    latestFile.current = selectedFile;
  }, [selectedFile]);

  useEffect(() => {
    return () => {
      latestFile.current.forEach((obj) => URL.revokeObjectURL(obj.previewFile));
    };
  }, []);

  function deleteHandler(id) {
    let temp = selectedFile.find((obj) => obj.id === id);
    if (temp) URL.revokeObjectURL(temp.previewFile);
    setSelectedFile((prev) => {
      let temp = [...prev].filter((obj) => obj.id !== id);
      return temp;
    });
  }
  return (
    <main>
      <h1>File Upload</h1>
      <FileUpload
        setSelectedFile={setSelectedFile}
        inputRef={inputRef}
        error={error}
        setError={setError}
        selectedFile={selectedFile}
      />

      <PreviewCard onDelete={deleteHandler} selectedFile={selectedFile} />
    </main>
  );
}

export default App;
