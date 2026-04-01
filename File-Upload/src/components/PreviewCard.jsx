import React from "react";

function PreviewCard({ onDelete, selectedFile }) {
  return (
    <div>
      {selectedFile?.length > 0 &&
        selectedFile.map(({ id, file, previewFile }) => {
          return (
            <div
              key={id}
              style={{ height: "10rem", width: "10rem", position: "relative" }}
            >
              <img
                src={previewFile}
                alt="image"
                style={{ height: "inherit", width: "inherit" }}
              />
              <button
                onClick={() => onDelete(id)}
                style={{ position: "absolute", top: "5px", right: "5px" }}
              >
                X
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default PreviewCard;
