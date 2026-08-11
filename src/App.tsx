import "./App.css";
import { TimeInput } from "./components/TimeInput";
import { useState } from "react";
type Term = { calType: string; time: string };

function App() {
  const [terms, setTerms] = useState<Term[]>([{ calType: "+", time: "" }]);

  const handleAdd = () => {
    setTerms((prev) => [...prev, { calType: "+", time: "" }]);
  };

  const updateTerm = (index: number, patch: Partial<Term>) => {
    setTerms((prev) =>
      prev.map((t, i) => (i === index ? { ...t, ...patch } : t)),
    );
  };

  return (
    <>
      {terms.map((term, i) => (
        <TimeInput
          key={i}
          calType={term.calType}
          time={term.time}
          onCalTypeChange={(v) => updateTerm(i, { calType: v })}
          onTimeChange={(v) => updateTerm(i, { time: v })}
        />
      ))}
      <button onClick={handleAdd}>Add Term</button>
    </>
  );
}

export default App;
