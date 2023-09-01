import React from "react";

export default function Question({question, /* options */}) {
  const options = ["a", "b", "c", "d", "e"];

  return (
    <div>
      <p>Question</p>
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
