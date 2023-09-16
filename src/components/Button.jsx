import React from "react";

export default function Button({
  type = "button",
  className = "btn",
  onClick = () => {},
  label,
  disabled = false,
  id = "",
}) {
  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      id={id}
    >
      {label}
    </button>
  );
}
