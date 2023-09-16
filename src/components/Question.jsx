import React, { useState, useMemo } from "react";
import Timer from "./Timer";
import AnswerIcon from "./AnswerIcon";
import Button from "./Button";
import getIdFrom from "../utils/getIdFrom.js";
import capitalize from "../utils/capitalize";
import randomOrder from "../utils/randomOrder";

export default function QuestionWrapper({
  question,
  isTimeLimitOn,
  onConfirmAnswer = () => {},
  onNext = () => {},
  options,
  isLastQuestion,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  /* 
    useMemo is used so that the answers aren't 
    generated in a different order on every render
  */
  const answers = useMemo(() => {
    /* randomize answers */
    return randomOrder(
      question.incorrect_answers.concat(question.correct_answer)
    );
  }, [question]);

  const correctAnswer = question.correct_answer;
  const correctOption = options[answers.findIndex((a) => a === correctAnswer)];
  const isUserCorrect = selectedAnswer === correctAnswer;

  /* if it is settled, either the user clicked confirm or timer has timed out */
  function handleSettlement() {
    onConfirmAnswer({
      question: question.question,
      answers: answers,
      correctAnswer: correctAnswer,
      userAnswer: selectedAnswer,
      difficulty: question.difficulty,
    });

    setIsAnswered(true);
  }

  let buttonText = "Confirm answer";
  if (isAnswered) {
    buttonText = isLastQuestion ? "Finish quiz" : "Next question >>";
  }

  return (
    <form
      className="question-wrapper"
      onSubmit={(e) => {
        e.preventDefault();
        if (isAnswered) onNext();
        else handleSettlement();
      }}
    >
      <QuestionMetadata
        category={question.category}
        difficulty={question.difficulty}
      />
      <Question
        questionText={question.question}
        isTimeLimitOn={isTimeLimitOn}
        isAnswered={isAnswered}
        onTimerFinished={handleSettlement}
      />
      <Answers
        answers={answers}
        onSelectAnswer={setSelectedAnswer}
        selectedAnswer={selectedAnswer}
        correctAnswer={correctAnswer}
        isAnswered={isAnswered}
        options={options}
      />
      {isAnswered && (
        // this is announced because App.jsx wraps QuestionsSequence in an aria-live="polite" element
        <p className="sr-only">
          Option {correctOption}, {correctAnswer}, is the correct answer.{" "}
          {isUserCorrect ? "You got it!" : "You were wrong"}
        </p>
      )}

      <Button type="submit" label={buttonText} disabled={!selectedAnswer} />
    </form>
  );
}

export function QuestionMetadata({ category, difficulty }) {
  return (
    <section
      className="question-metadata flex space-between gap-1"
      aria-label="About question"
    >
      <p className="question-category">
        <span className="sr-only">Category:</span>
        {category}
      </p>

      <QuestionDifficulty difficulty={difficulty} />
    </section>
  );
}

export function QuestionDifficulty({ difficulty }) {
  return (
    <span className={`question-difficulty ${difficulty}`}>
      <span className="sr-only">Difficulty</span>
      {capitalize(difficulty)}
    </span>
  );
}

export function Question({
  isAnswered,
  onTimerFinished,
  isTimeLimitOn,
  questionText,
}) {
  return (
    <section
      aria-label="Question"
      className="question flex space-between gap-1 align-center"
    >
      <p>{questionText}</p>
      {!isAnswered && isTimeLimitOn && (
        <Timer
          duration={20000}
          onFinish={onTimerFinished}
          size={30}
          fillColor="#fff"
        />
      )}
    </section>
  );
}

export function Answers({
  answers,
  onSelectAnswer,
  selectedAnswer,
  correctAnswer,
  isAnswered,
  options,
}) {
  return (
    <section aria-label="Answers">
      <ul className="answers">
        {answers.map((a, i) => {
          return (
            <li key={a}>
              <Answer
                answer={a}
                onSelectAnswer={onSelectAnswer}
                selected={a === selectedAnswer}
                isCorrect={a === correctAnswer}
                isAnswered={isAnswered}
                option={options[i]}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function Answer({
  answer,
  onSelectAnswer,
  selected,
  isAnswered,
  isCorrect,
  option,
}) {
  const radioId = getIdFrom(answer);

  let className = "answer";
  if (isAnswered) {
    className += isCorrect ? " correct" : " wrong";
  } else if (selected) {
    className += " selected";
  }

  return (
    <label htmlFor={radioId} className={className}>
      <span aria-hidden="true">({option})</span>
      <input
        type="radio"
        value={answer}
        name="answer"
        id={radioId}
        onChange={(e) => {
          if (!isAnswered) {
            onSelectAnswer(e.target.value);
          }
        }}
        checked={selected}
      />
      <span className="sr-only">Option {option} </span>
      <span className="label-text">{answer}</span>
      {isAnswered && <AnswerIcon isCorrect={isCorrect} />}
    </label>
  );
}
