import React, { useState } from "react";

export default function FinalScreen({
  correctQuestions,
  questions,
  onPlayAgain,
}) {
  const correctQuestionsLength = correctQuestions.length;
  const questionsLength = questions.length;

  return (
    <section aria-labelledby="quiz-finished" className="quiz-finished-section">
      <h2 id="quiz-finished">Quiz finished</h2>
      <p className="out-of">
        {correctQuestionsLength} out of {questionsLength}
      </p>
      <p className="percentage">{Math.round((correctQuestionsLength / questionsLength) * 100)}%</p>

      <button type="button" onClick={onPlayAgain} className="btn lightgreen-btn">
        Play again
      </button>

      <QuestionsTabs
        correctQuestions={correctQuestions}
        questions={questions}
      />
    </section>
  );
}

export function QuestionsTabs({ correctQuestions, questions }) {
  const [selectedTab, setSelectedTab] = useState("correct");

  return (
    <div>
      <div className="tab-links">
        <a
          href="#correct-questions"
          onClick={() => setSelectedTab("correct")}
          title="Your correct answers"
        >
          Correct Questions
        </a>
        <a
          href="#wrong-questions"
          onClick={() => setSelectedTab("wrong")}
          title="Your wrong answers"
        >
          Wrong Questions
        </a>
      </div>
      <QuestionsList
        id="correct-questions"
        questions={correctQuestions}
        hidden={selectedTab !== "correct"}
      />
      <QuestionsList
        id="wrong-questions"
        questions={questions.filter(
          (q) => !correctQuestions.some((cq) => cq.question === q.question)
        )}
        hidden={selectedTab !== "wrong"}
      />
    </div>
  );
}

export function QuestionsList({ questions, id }) {
  return (
    <ul className="question-list" id={id}>
      {questions.map((q) => {
        return (
          <li key={q.question}>
            <p>{q.question}</p>
            <p>Options: </p>
            <ul>
              {q.incorrect_answers.concat(q.correct_answer).map((o) => {
                return <li key={o}>{o}</li>;
              })}
            </ul>
            <p>Correct answer: {q.correct_answer}</p>
            <p>Your answer: {}</p>
          </li>
        );
      })}
    </ul>
  );
}
