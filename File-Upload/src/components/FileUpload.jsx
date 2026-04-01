import React from "react";
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
function FileUpload({ inputRef, setSelectedFile, error, setError }) {
  function changeHanlder(e) {
    setError(null);
    let file = e.target.files?.[0];
    // e.target.value = "";

    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Max file size");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setError("file type is invalid");
      return;
    }

    setSelectedFile(file);
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={allowedTypes.join(",")}
        onChange={changeHanlder}
      />

      {error && <div style={{ color: "red", marginTop: "1rem" }}>{error}</div>}
    </div>
  );
}

export default FileUpload;
