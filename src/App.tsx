import "./App.css";
import { TimeInput } from "./components/TimeInput";
import { TimeDuration } from "./utilities/TimeDuration";
import { useState } from "react";
type Term = { calType: string; time: string };

function App() {
  const [terms, setTerms] = useState<Term[]>([{ calType: "+", time: "" }]);
  const [cal, setCal] = useState<boolean>(false);
  const [result, setResult] = useState<TimeDuration>(new TimeDuration(0, 0, 0));
  const handleAdd = () => {
    setTerms((prev) => [...prev, { calType: "+", time: "" }]);
  };

  const updateTerm = (index: number, patch: Partial<Term>) => {
    setTerms((prev) =>
      prev.map((t, i) => (i === index ? { ...t, ...patch } : t)),
    );
  };

  const handleCal = () => {
    setCal(true);
    const total = terms.reduce(
      (acc, term) => {
        const value = TimeDuration.fromString(term.time);
        return term.calType === "+" ? acc.add(value) : acc.subtract(value);
      },
      new TimeDuration(0, 0, 0),
    );

    setResult(total);
  };

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <label htmlFor="result">Result: </label>
        {cal && <span className="result">{result.toString()}</span>}
      </div>
      {terms.map((term, i) => (
        <TimeInput
          key={i}
          calType={term.calType}
          time={term.time}
          onCalTypeChange={(v) => updateTerm(i, { calType: v })}
          onTimeChange={(v) => updateTerm(i, { time: v })}
        />
      ))}
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={handleAdd}>Add Term</button>
        <button onClick={handleCal}>Calculate</button>
      </div>
    </>
  );
}

export default App;
