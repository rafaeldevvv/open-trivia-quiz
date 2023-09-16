import React, { useState } from "react";
import Question from "./Question";

export default function QuestionsSequence({
  questions,
  onConfirmAnswer,
  onEnd,
  isTimeLimitOn,
  options
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  function handleNext() {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex === questions.length) onEnd();
    else setCurrentQuestionIndex(nextIndex);
  }

  const currentQuestion = questions?.[currentQuestionIndex];
  return (
    <div>
      <Question
        key={currentQuestion.question}
        question={currentQuestion}
        onConfirmAnswer={onConfirmAnswer}
        onNext={handleNext}
        isTimeLimitOn={isTimeLimitOn}
        options={options}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
      />
    </div>
  );
}
