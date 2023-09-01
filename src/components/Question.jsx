import React from "react";
import Timer from "./Timer";

export default function Question({
  question,
  options = ["a", "b", "c", "d", "e"],
  correctOption
}) {
   /* 
   - State
   selectedOption
    */
  return (
    <div>
      <p>Question <Timer timeout={20} /></p>
      <ul>
        {options.map((o) => {
          return (
            <li key={o}>
              <button>{o}</button>
            </li>
          );
        })}
      </ul>
      <button>confirm</button>
      <button>next</button>
    </div>
  );
}
