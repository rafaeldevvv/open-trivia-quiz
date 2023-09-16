import decodeQuestion from "./decodeQuestion";

export default function fetchQuestions(amount, categoryId, difficulty) {
  const categoryQuery = categoryId ? `&category=${categoryId}` : "";
  const difficultyQuery = difficulty ? `&difficulty=${difficulty}` : "";

  return fetch(
    `https://opentdb.com/api.php?amount=${amount}&encode=url3986${categoryQuery}${difficultyQuery}`
  )
    .then((res) => {
      if (res.status >= 300) {
        throw new Error(
          `Failed to fetch questions. ${res.status} ${res.statusText}`
        );
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data.response_code !== 0)
        throw new Error(`API returned ${data.response_code} code`);
      else return data.results.map(decodeQuestion);
    });
}
