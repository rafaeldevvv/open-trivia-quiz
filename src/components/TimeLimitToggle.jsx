import React from "react";
import CheckboxToggle from "./CheckboxToggle";

export default function TimeLimitToggle({ onToggleTimeLimit, isTimeLimitOn }) {
  return (
    <div className="form-field">
      <CheckboxToggle
        checked={isTimeLimitOn}
        onToggle={onToggleTimeLimit}
        id="time-limit-checkbox"
        label="Time limit (20 seconds p/question): "
        srWarning="Turn this off if you are using a screen reader"
      />
    </div>
  );
}
