import React, { useState } from "react";
import InitialScreen from "./components/InitialScreen";
import QuestionsSequence from "./components/QuestionsSequence";
import FinalScreen from "./components/FinalScreen";
import useFetch from "./custom-hooks/useFetch";

export default function App() {
  /* choosing. playing finished */
  const [status, setStatus] = useState("choosing");
  
  /* 
  - State 
  questions
  numberOfQuestions
  
  */


  const isChoosing = status === "choosing";
  const isPlaying = status === "playing";
  const isFinished = status === "finished";
  return (
    <React.StrictMode>
      <main>
        <h1>Open Trivia DB Quiz</h1>
        {isChoosing && <InitialScreen categories={categories} />}
        {isPlaying && <QuestionsSequence  />}
        {isFinished && <FinalScreen />}
      </main>
    </React.StrictMode>
  );
}
