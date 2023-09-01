import React from "react";

export default function InitialScreen() {

  /* 
  State
  category 
  difficulty
  number of questions
  */
  
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <p>
        <label htmlFor="category-select">Category</label>
        <select id="category-select"></select>
      </p>

      <p>
        <label htmlFor="difficulty-select">Difficulty</label>
        <select id="difficulty-select"></select>
      </p>

      <p>
        <label htmlFor="amount">Number of questions</label>
        <input type="number" min="10" max="40" />
      </p>

      <button type="submit">Start quiz</button>
    </form>
  );
}
