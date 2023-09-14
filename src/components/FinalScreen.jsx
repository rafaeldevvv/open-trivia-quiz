import React, { useState } from "react";
import { QuestionDifficulty } from "./Question";
import AnswerIcon from "./AnswerIcon";

function checkQuestionIsCorrect(question) {
  return question.correctAnswer === question.userAnswer;
}

export default function FinalScreen({
  answeredQuestions,
  onPlayAgain = () => {},
  options,
}) {
  const correctQuestions = answeredQuestions.filter(checkQuestionIsCorrect);
  const wrongQuestions = answeredQuestions.filter(
    (q) => !checkQuestionIsCorrect(q)
  );

  return (
    <>
      <section
        aria-labelledby="quiz-finished"
        className="quiz-finished-section"
      >
        <h2 id="quiz-finished">Quiz finished</h2>
        <p className="out-of">
          {correctQuestions.length} out of {answeredQuestions.length}
        </p>
        <p className="percentage">
          {Math.round(
            (correctQuestions.length / answeredQuestions.length) * 100
          )}
          %
        </p>

        <button
          type="button"
          onClick={onPlayAgain}
          className="btn lightgreen-btn"
        >
          Play again
        </button>
      </section>
      <QuestionsTabs
        correctQuestions={correctQuestions}
        wrongQuestions={wrongQuestions}
        options={options}
      />
    </>
  );
}

export function QuestionsTabs({ correctQuestions, wrongQuestions, options }) {
  const [selectedTab, setSelectedTab] = useState("correct");

  return (
    <section className="questions-section" aria-labelledby="questions_heading">
      <h2 id="questions_heading">Questions</h2>
      <TabButtons onSelectTab={setSelectedTab} selectedTab={selectedTab} />
      <SrLinks onSelectTab={setSelectedTab} />
      <QuestionsList
        id="correct-questions"
        questions={correctQuestions}
        hidden={selectedTab !== "correct"}
        options={options}
        noQuestionsText="No correct questions"
      />
      <QuestionsList
        id="wrong-questions"
        questions={wrongQuestions}
        hidden={selectedTab !== "wrong"}
        options={options}
        noQuestionsText="No wrong questions"
      />
    </section>
  );
}

export function TabButtons({ onSelectTab, selectedTab }) {
  return (
    <ul aria-hidden="true" className="tab-buttons">
      <li>
        <button
          onClick={() => onSelectTab("correct")}
          title="Your correct answers"
          className={
            (selectedTab === "correct" ? "active" : "") + " tab-button"
          }
        >
          Correct Questions
        </button>
      </li>
      <li>
        <button
          onClick={() => onSelectTab("wrong")}
          title="Your wrong answers"
          className={(selectedTab === "wrong" ? "active" : "") + " tab-button"}
        >
          Wrong Questions
        </button>
      </li>
    </ul>
  );
}

export function SrLinks({ onSelectTab }) {
  return (
    <ul className="sr-only">
      <li>
        <a
          href="#correct-questions"
          onClick={() => onSelectTab("correct")}
          title="Your correct answers"
        >
          Correct Questions
        </a>
      </li>
      <li>
        <a
          href="#wrong-questions"
          onClick={() => onSelectTab("wrong")}
          title="Your wrong answers"
        >
          Wrong Questions
        </a>
      </li>
    </ul>
  );
}

export function QuestionsList({
  questions,
  id,
  hidden,
  options,
  noQuestionsText,
}) {
  let className = "question-list";
  if (hidden) className += " hidden";

  const noQuestions = questions.length === 0;

  let listInner;
  if (noQuestions) {
    listInner = noQuestionsText;
  } else {
    listInner = questions.map((q) => {
      return (
        <li key={q.question} className="question">
          <QuestionDifficulty difficulty={q.difficulty} />
          <p className="question-text">{q.question}</p>
          <ul className="answer-list">
            {q.answers.map((a, i) => {
              return (
                <li key={a} className="answer">
                  ({options[i]}) {a}
                </li>
              );
            })}
          </ul>
          <p className="correct-answer">
            <span>Correct answer: {q.correctAnswer}</span>
            <AnswerIcon isCorrect={true} />
          </p>
          {!checkQuestionIsCorrect(q) && (
            <p className="wrong-answer">
              <span>Your answer: {q.userAnswer}</span>
              <AnswerIcon isCorrect={false} />
            </p>
          )}
        </li>
      );
    });
  }

  return (
    <ul
      className={className}
      id={id}
      style={{ textAlign: noQuestions ? "center" : "left" }}
    >
      {listInner}
    </ul>
  );
}
