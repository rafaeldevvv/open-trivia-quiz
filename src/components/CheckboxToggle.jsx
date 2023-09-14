import React, {useState} from "react";

export default function CheckboxToggle({
  checked,
  id,
  onToggle,
  label,
  srWarning,
}) {
  const [isFocused, setIsFocused] = useState(false);

  let buttonClassName = "checkbox-toggle-button";
  if (checked) buttonClassName += " active";
  if (isFocused) buttonClassName += " focused";

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
        checked={checked}
        className="sr-only"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <span
        type="button"
        aria-hidden="true"
        tabIndex="-1"
        className={buttonClassName}
        onKeyDown={(e) => {
          if (e.key.indexOf(" ") !== -1) {
            onToggle(!checked);
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <span className="checkbox-toggle-ball"></span>
      </span>
    </label>
  );
}
