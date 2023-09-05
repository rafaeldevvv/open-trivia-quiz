import React from "react";

export default function Spinner({ size, loadingTarget, color = "white" }) {
  const sizeString = size + "px";
  return (
    <span style={{ width: sizeString, height: sizeString, color }} className="spinner">
      <span className="sr-only">Loading {loadingTarget}</span>
    </span>
  );
}
