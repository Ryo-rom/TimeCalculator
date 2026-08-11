import { useState } from "react";

type TimeInputProps = {
  calType: string;
  time: string;
  onCalTypeChange: (value: string) => void;
  onTimeChange: (value: string) => void;
};

export function TimeInput({
  calType,
  time,
  onCalTypeChange,
  onTimeChange,
}: TimeInputProps) {
  const [valid, setValid] = useState(true);
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);

    if (/^\d+:\d+:\d+$/.test(time.trim())) {
      setValid(true);
      onTimeChange(time.trim());
    } else {
      onTimeChange("");
      setValid(false);
    }
  };

  const showError = touched && !valid && time.length > 0;

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <label htmlFor="calType">Operator</label>
      <select
        id="calType"
        value={calType}
        onChange={(e) => onCalTypeChange(e.target.value)}
      >
        <option value="+">+</option>
        <option value="-">-</option>
      </select>

      <label htmlFor="time">Time</label>
      <input
        id="time"
        type="text"
        value={time}
        placeholder="HH:MM:SS"
        onChange={(e) => onTimeChange(e.target.value)}
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
