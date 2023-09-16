export default async function fetchQuestionCount(categoryId) {
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
