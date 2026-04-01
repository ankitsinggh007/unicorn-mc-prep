import { useEffect, useState, useRef } from "react";
import FileUpload from "./components/FileUpload";
import PreviewCard from "./components/PreviewCard";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    let filePreview;
    if (selectedFile) {
      filePreview = URL.createObjectURL(selectedFile);
      setPreviewURL(filePreview);
    }

    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
  }, [selectedFile]);

  function deleteHandler() {
    inputRef.current.value = "";
    setSelectedFile(null);
    setPreviewURL(null);
  }

  return (
    <main>
      <h1>File Upload</h1>
      <FileUpload
        setSelectedFile={setSelectedFile}
        inputRef={inputRef}
        error={error}
        setError={setError}
      />

      <PreviewCard onDelete={deleteHandler} previewURL={previewURL} />
    </main>
  );
}

export default App;
