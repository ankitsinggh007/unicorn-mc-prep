import React from "react";
import PreviewCard from "./PreviewCard";
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
const ALLOWED_FILES = 5;

function FileUpload({
  selectedFile,
  inputRef,
  setSelectedFile,
  error,
  setError,
}) {
  function changeHandler(e) {
    setError(null);
    const incoming = Array.from(e.target.files || []);
    e.target.value = "";

    const existingIds = new Set(
      selectedFile.map(
        (obj) => `${obj.file.lastModified}${obj.file.size}${obj.file.name}`,
      ),
    );

    const errors = [];

    const newFiles = incoming.filter(
      (f) => !existingIds.has(`${f.lastModified}${f.size}${f.name}`),
    );

    let finalisedFiles = [];

    newFiles.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        errors.push(`Max file size exceeded for ${file.name}`);
      } else if (!allowedTypes.includes(file.type)) {
        errors.push(`Invalid file type for ${file.name}`);
      } else {
        finalisedFiles.push(file);
      }
    });

    if (finalisedFiles.length + selectedFile.length > ALLOWED_FILES) {
      errors.push(`You can only upload ${ALLOWED_FILES} files`);
      finalisedFiles.splice(ALLOWED_FILES - selectedFile.length);
    }

    if (errors.length) setError(errors.join(", "));

    const wrappedFiles = finalisedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewFile: URL.createObjectURL(file),
    }));

    if (wrappedFiles.length) {
      setSelectedFile((prev) => [...prev, ...wrappedFiles]);
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={allowedTypes.join(",")}
        onChange={changeHandler}
        multiple={true}
      />

      {error && <div style={{ color: "red", marginTop: "1rem" }}>{error}</div>}
    </div>
  );
}

export default FileUpload;
