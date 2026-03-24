import { useState } from "react";
import OTP from "./components/OTP.jsx";
const LENGTH = 6;

function App() {
  const [code, setCode] = useState("");
  const [hide, setHide] = useState(true);

  let toggleHide = () => {
    setHide((prev) => !prev);
    setCode(""); // reset on toggle
  };

  let onComplete = (otp) => {
    console.log("otp", otp);
    setCode(otp);
  };

  return (
    <main>
      <h1>OTP TASK</h1>
      <button onClick={toggleHide}>{hide ? "Show" : "Hide"} OTP</button>
      {!hide && <OTP size={LENGTH} onComplete={onComplete} />}

      <button
        style={{
          backgroundColor: `${code.length < LENGTH ? "gray" : "blue"} `,
        }}
        disabled={code.length < LENGTH}
      >
        submit
      </button>
    </main>
  );
}

export default App;
