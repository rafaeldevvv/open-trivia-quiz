import React from "react";

export default function InitialScreen() {

  /* 
  State
  category 
  difficulty
  number of questions
  */
  const [categoriesObject, areCategoriesLoading] = useFetch("https://opentdb.com/api_category.php");
  const categories = categoriesObject.trivia_categories;
  
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <p>
        <label htmlFor="category-select">Category</label>
        <select id="category-select">
          {categories?.map(c => {
            return (
              <option>{c}</option>
            )
          })}
        </select>
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
