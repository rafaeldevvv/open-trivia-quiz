import React from "react";
import CheckboxToggle from "./CheckboxToggle";

export default function TimeLimitToggle({ onToggleTimeLimit, isTimeLimitOn }) {
  return (
    <div className="form-field">
      <CheckboxToggle
        isOn={isTimeLimitOn}
        onToggle={onToggleTimeLimit}
        id="time-limit-checkbox"
        label="Time limit: "
        srWarning="Turn this off if you are using a screen reader"
      />
    </div>
  );
}
