import React from "react";

export default function AmountInput({ max, onChange, value }) {
  return (
    <input
      type="number"
      min="1"
      max={max}
      onChange={(e) => onChange(Number(e.target.value))}
      value={value}
      required
      id="number-of-questions"
    />
  );
}
