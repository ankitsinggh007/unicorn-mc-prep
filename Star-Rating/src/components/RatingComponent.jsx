import { useState } from "react";

export default function RatingComponent({
  onChange,
  size = 5,
  value = 0,
  READONLY = false,
}) {
  let [last, setLast] = useState(0);
  return (
    <div onMouseLeave={READONLY ? null : () => setLast(0)}>
      {Array.from({ length: size }).map((obj, index) => {
        let filled = last > 0 ? index + 1 <= last : index + 1 < value;

        return (
          <span
            key={index}
            onMouseEnter={READONLY ? null : () => setLast(index + 1)}
            onClick={READONLY ? null : () => onChange(index + 1)}
          >
            {filled ? "⭐" : "⭐︎"}
          </span>
        );
      })}
    </div>
  );
}
