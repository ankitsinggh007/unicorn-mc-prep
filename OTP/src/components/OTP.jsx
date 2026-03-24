import { useState, useRef, useEffect } from "react";

export default function OTP({ onComplete, size = 6 }) {
  let [otpbox, setOtp] = useState(Array(size).fill(""));
  let otpref = useRef();
  let nodeRef = useRef();
  let [show, setShow] = useState(false);
  useEffect(() => {
    nodeRef.current = otpref.current.querySelectorAll("input");

    nodeRef.current[0].focus();
  }, []);

  useEffect(() => {
    let isComplete = otpbox.every((obj) => /^\d$/.test(obj));
    if (isComplete) onComplete(otpbox.join(""));
    else onComplete(""); // reset parent when incomplete
  }, [otpbox]);

  let pastHandler = (e) => {
    e.preventDefault();
    let str = e.clipboardData.getData("text");
    let otp = str
      .split("")
      .filter((w) => /^\d$/.test(w))
      .join("")
      .slice(0, size);

    setOtp((prev) => {
      let temp = [...prev];
      for (let i = 0; i < size; i++) {
        temp[i] = otp[i] || "";
      }

      return [...temp];
    });
    if (otp.length > 0) nodeRef.current[otp.length - 1].focus();
  };

  let keyBoardHandler = (e, index) => {
    if (e.key === "Backspace") {
      if (otpbox[index] !== "")
        setOtp((prev) => {
          let temp = [...prev];
          temp[index] = "";
          return temp;
        });
      else if (index > 0) nodeRef.current[index - 1].focus();
    }
  };

  let inputHandler = (e, index) => {
    if (e.target.value.length > 1) return;
    if (!/^\d$/.test(e.target.value)) return;
    let last = otpbox[index];
    console.log(last, "k");
    setOtp((prev) => {
      let temp = [...prev];
      temp[index] = e.target.value;
      return temp;
    });

    if (last === "" && index < size - 1) nodeRef.current[index + 1].focus();
  };

  return (
    <>
      <button onClick={() => setShow((prev) => !prev)}>
        {show ? "hide" : "show"}
      </button>
      <div
        ref={otpref}
        style={{
          width: "80%",
          height: "3rem",
          border: "1px solid black",
          display: "flex",
          justifyContent: "space-evenly",
          boxSizing: "content-box",
        }}
      >
        {otpbox.map((obj, index) => {
          // console.log(obj, index, otpbox);
          return (
            <input
              value={otpbox[index]}
              onKeyDown={(e) => keyBoardHandler(e, index)}
              onChange={(e) => inputHandler(e, index)}
              onPaste={(e) => pastHandler(e)}
              style={{
                width: "3rem",
                height: "3rem",
                border: "1px solid black",
                fontSize: "1.5rem",
              }}
              key={index}
              type={show ? "text" : "password"}
              // autoFocus // it also not working
            />
          );
        })}
      </div>
    </>
  );
}
