import React from "react";

export default function Select({
  options,
  defaultOption,
  id,
  value,
  onChange,
  disabled,
}) {
  return (
    <select
      id={id}
      value={value || 'any'}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      <option value={"any"}>
        {defaultOption}
      </option>
      {options?.map((option) => {
        return (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
}
