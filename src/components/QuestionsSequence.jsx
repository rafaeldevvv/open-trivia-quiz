import React, { useState } from "react";
import Question from "./Question";

export default function QuestionsSequence({
  questions,
  onCorrect,
  onEnd,
  isTimeLimitOn,
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
        onCorrect={onCorrect}
        onNext={handleNext}
        isTimeLimitOn={isTimeLimitOn}
      />
    </div>
  );
}
