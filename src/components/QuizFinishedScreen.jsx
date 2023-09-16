import React, { useRef, useState } from "react";
import { QuestionDifficulty } from "./Question";
import AnswerIcon from "./AnswerIcon";
import Button from "./Button";

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
          {correctQuestions.length} out of {answeredQuestions.length} questions
        </p>
        <p className="percentage">
          {Math.round(
            (correctQuestions.length / answeredQuestions.length) * 100
          )}
          %
        </p>

        <Button onClick={onPlayAgain} label="Play again" />
      </section>
      <QuestionsSection
        correctQuestions={correctQuestions}
        wrongQuestions={wrongQuestions}
        options={options}
      />
    </>
  );
}

export function QuestionsSection({ correctQuestions, wrongQuestions, options }) {
  const [selectedTab, setSelectedTab] = useState("correct");

  return (
    <section className="questions-section" aria-labelledby="questions_heading">
      <h2 id="questions_heading">Questions</h2>
      <div className="tabs" aria-label="Question Tabs">
        <Tablist onSelectTab={setSelectedTab} selectedTab={selectedTab} />
        <TabPanels
          selectedTab={selectedTab}
          wrongQuestions={wrongQuestions}
          correctQuestions={correctQuestions}
          options={options}
        />
      </div>
    </section>
  );
}

export function Tablist({ onSelectTab, selectedTab }) {
  const isCorrectSelected = selectedTab === "correct";

  const commonAttrs = {
    role: "tab",
    "aria-setsize": "2",
  };

  const correctTabRef = useRef(null);
  const wrongTabRef = useRef(null);

  function focus(tab) {
    if (tab === "correct") {
      correctTabRef.current.focus();
    } else {
      wrongTabRef.current.focus();
    }
  }

  return (
    <div
      className="tablist"
      role="tablist"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          const tab = isCorrectSelected ? "wrong" : "correct";
          onSelectTab(tab);
          focus(tab);
        }
      }}
    >
      <button
        className={"tab " + (isCorrectSelected ? "active-tab" : "")}
        id="correct-tab"
        aria-selected={isCorrectSelected}
        aria-posinset="1"
        aria-controls="correct-questions"
        tabIndex={isCorrectSelected ? "0" : "-1"}
        onClick={() => onSelectTab("correct")}
        {...commonAttrs}
        ref={correctTabRef}
      >
        Correct questions
      </button>

      <button
        className={"tab " + (isCorrectSelected ? "" : "active-tab")}
        id="wrong-tab"
        aria-selected={!isCorrectSelected}
        aria-posinset="2"
        aria-controls="wrong-questions"
        tabIndex={isCorrectSelected ? "-1" : "0"}
        onClick={() => onSelectTab("wrong")}
        {...commonAttrs}
        ref={wrongTabRef}
      >
        Wrong questions
      </button>
    </div>
  );
}

export function TabPanels({
  selectedTab,
  wrongQuestions,
  options,
  correctQuestions,
}) {
  const isCorrectSelected = selectedTab === "correct";

  return (
    <div className="panels">
      <div
        role="tabpanel"
        className={isCorrectSelected ? "active-panel" : ""}
        hidden={isCorrectSelected ? false : true}
        aria-labelledby="correct-tab"
        tabIndex="0"
        id="correct-questions"
      >
        <QuestionsList
          questions={correctQuestions}
          options={options}
          noQuestionsText="No correct questions"
        />
      </div>
      <div
        role="tabpanel"
        className={!isCorrectSelected ? "active-panel" : ""}
        hidden={!isCorrectSelected ? false : true}
        aria-labelledby="wrong-tab"
        tabIndex="0"
        id="wrong-questions"
      >
        <QuestionsList
          questions={wrongQuestions}
          options={options}
          noQuestionsText="No wrong questions"
        />
      </div>
    </div>
  );
}

export function QuestionsList({ questions, options, noQuestionsText }) {
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
            {q.answers.map((answer, i) => {
              return (
                <li key={answer} className="answer">
                  <span className="sr-only">Option {options[i]}:</span>
                  <span aria-hidden="true">({options[i]}) </span>
                  {answer}
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
      className="question-list"
      style={{ textAlign: noQuestions ? "center" : "left" }}
    >
      {listInner}
    </ul>
  );
}
