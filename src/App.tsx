import "./App.css";
import { TimeInput } from "./components/TimeInput";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(1);
  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <TimeInput key={i} />
      ))}
      <button onClick={handleClick}>Add Term</button>
    </>
  );
}

export default App;
