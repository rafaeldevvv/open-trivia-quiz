import decodeQuestion from "./decodeQuestion";

export async function fetchCategories() {
  const res = await fetch("https://opentdb.com/api_category.php");
  if (res.status > 299) {
    throw new Error(
      `Failed to fetch categories. Please, try reloading the page. ${res.status} ${res.statusText}`
    );
  }

  const categoriesJSON = await res.json();
  const categories = categoriesJSON.trivia_categories;
  return categories;
}

export async function fetchQuestionCount(categoryId) {
  const response = await fetch(
    `https://opentdb.com/api_count.php?category=${categoryId}`
  );

  let data;
  if (response.status <= 299) {
    data = await response.json();
  } else {
    throw new Error(
      "Failed to fetch question count for category with id " + categoryId
    );
  }

  const questionCount = data.category_question_count;

  return {
    categoryId: categoryId,
    count: {
      total: questionCount.total_question_count,
      easy: questionCount.total_easy_question_count,
      medium: questionCount.total_medium_question_count,
      hard: questionCount.total_hard_question_count,
    },
  };
}

export async function fetchQuestionCounts(categories) {
  const questionCounts = await Promise.all(
    categories.map((category) => fetchQuestionCount(category.id))
  );
  return questionCounts;
}

export function fetchQuestions(amount, categoryId, difficulty) {
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
        throw new Error(
          `API returned ${data.response_code} code. Invalid parameters or no results for your query.`
        );
      else return data.results.map(decodeQuestion);
    });
}
