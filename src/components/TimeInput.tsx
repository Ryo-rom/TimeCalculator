import { useState } from "react";

export function TimeInput() {
  const [calType, setCalType] = useState("+");
  const [time, setTime] = useState("");
  const [valid, setValid] = useState(true);
  const [touched, setTouched] = useState(false);

  const opeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCalType(e.target.value);
  };

  const handleBlur = () => {
    setTouched(true);

    if (/^\d+:\d+:\d+$/.test(time.trim())) {
      setValid(true);
      setTime(time.trim());
    } else {
      setTime("");
      setValid(false);
    }
  };

  const timeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const showError = touched && !valid && time.length > 0;

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <label htmlFor="calType">Operator</label>
      <select id="calType" value={calType} onChange={opeChange}>
        <option value="+">+</option>
        <option value="-">-</option>
      </select>

      <label htmlFor="time">Time</label>
      <input
        id="time"
        type="text"
        value={time}
        placeholder="HH:MM:SS"
        onChange={timeChange}
        onBlur={handleBlur}
      />
      {showError && (
        <span className="error">
          Please enter the time in "HH:MM:SS" format.
        </span>
      )}
    </div>
  );
}
