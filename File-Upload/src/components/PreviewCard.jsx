import React from "react";

function PreviewCard({ onDelete, previewURL }) {
  return (
    <div>
      {previewURL && (
        <div style={{ height: "10rem", width: "10rem", position: "relative" }}>
          <img
            src={previewURL}
            alt="image"
            style={{ height: "inherit", width: "inherit" }}
          />
          <button
            onClick={onDelete}
            style={{ position: "absolute", top: "5px", right: "5px" }}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}

export default PreviewCard;
