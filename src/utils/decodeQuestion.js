export default function decodeQuestion(question) {
  const decoded = { ...question };

  decoded.question = decodeURIComponent(question.question);
  decoded.correct_answer = decodeURIComponent(question.correct_answer);
  decoded.incorrect_answers =
    question.incorrect_answers.map(decodeURIComponent);
  decoded.category = decodeURIComponent(question.category);

  return decoded;
}
