import React from "react";

function FinalStep({ formData }) {
  return (
    <div>
      {Object.keys(formData).map((key, index) => {
        return (
          <span className="flex " key={index}>
            <p className="font-semibold">{key} :</p>
            <p>{formData?.[key]}</p>
          </span>
        );
      })}
    </div>
  );
}

export default FinalStep;
