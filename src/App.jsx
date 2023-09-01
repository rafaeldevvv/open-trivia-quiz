import React, { useState } from "react";
import InitialScreen from "./components/InitialScreen";
import QuestionsSequence from "./components/QuestionsSequence";
import FinalScreen from "./components/FinalScreen";

export default function App() {
  /* choosing. playing finished */
  const [status, setStatus] = useState("choosing");

  const isChoosing = status === "choosing";
  const isPlaying = status === "playing";
  const isFinished = status === "finished";
  return (
    <>
      <main>
        <h1>Open Trivia DB Quiz</h1>
        {isChoosing && <InitialScreen />}
        {isPlaying && <QuestionsSequence />}
        {isFinished && <FinalScreen />}
      </main>
    </>
  );
}
