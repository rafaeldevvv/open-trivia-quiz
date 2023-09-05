import React from "react";
import Question from "./Question";

export default function QuestionsSequence({ questions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  /* 
  State
  currentQuestionIndex
  numberOfCorrectQuestions
   */

  function handleNext() {
    
  }

  return (
    <div>
      <Question question={questions[currentQuestionIndex]} onClickNext={handleNext} />
    </div>
  );
}
