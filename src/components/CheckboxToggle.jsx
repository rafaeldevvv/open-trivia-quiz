import React, { useState } from "react";

export default function CheckboxToggle({
  isOn,
  id,
  onToggle,
  label,
  srWarning,
}) {
  return (
    <label
      className="checkbox-toggle-label flex align-center gap-1"
      htmlFor={id}
    >
      {label}
      {srWarning && <span className="sr-only">{srWarning}</span>}
      <input
        type="checkbox"
        id={id}
        onChange={(e) => {
          onToggle(e.target.checked);
        }}
        checked={isOn}
        className="sr-only"
      />
      <button
        type="button"
        aria-hidden="true"
        className={`checkbox-toggle-button ${isOn ? "active" : ""}`}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onToggle(!isOn);
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <span className="checkbox-toggle-ball"></span>
        <span className="sr-only"></span>
      </button>
    </label>
  );
}
