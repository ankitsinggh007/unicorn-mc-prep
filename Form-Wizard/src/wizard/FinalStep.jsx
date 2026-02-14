import React from "react";

function FinalStep({ formData }) {
  console.log(formData, formData.name);
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
