import React from "react";

export default function AmountInput({ max, onChange, value }) {
  return (
    <input
      type="number"
      min="1"
      max={max}
      onChange={(e) => {
        const num = Number(e.target.value);
        if (!isNaN(num) && Math.floor(num) === num) onChange(e.target.value);
      }}
      placeholder={`Enter 1 to ${max}`}
      value={value}
      required
      id="number-of-questions"
      aria-live="off" // make input not get read twice
    />
  );
}
