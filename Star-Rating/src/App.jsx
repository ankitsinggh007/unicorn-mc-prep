import { useState } from "react";
import RatingComponent from "./components/RatingComponent.jsx";
let LENGTH = 5;
let READONLY = false;
function App() {
  const [rating, setRating] = useState(0);

  return (
    <main>
      <h1>Rating Component</h1>

      <RatingComponent
        size={LENGTH}
        onChange={setRating}
        value={rating}
        readOnly={READONLY}
      />

      <p>Your current Rating is {rating} </p>
    </main>
  );
}

export default App;
