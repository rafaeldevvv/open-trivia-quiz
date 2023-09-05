import React, { useState } from "react";
import InitialScreen from "./components/InitialScreen";
import QuestionsSequence from "./components/QuestionsSequence";
import FinalScreen from "./components/FinalScreen";

export default function App() {
  /* choosing, playing, finished */
  const [status, setStatus] = useState("choosing");
  const [questions, setQuestions] = useState(null);

  /* 
  - State 
  questions
  questions.length
  correctAnswers
  */

  async function handleStart(categoryId, difficulty, amount) {
    const categoryQuery = categoryId ? `&category=${categoryId}` : "";
    const difficultyQuery = difficulty ? `&difficulty=${difficulty}` : "";

    const questionsJSON = await fetch(
      `https://opentdb.com/api.php?amount=${amount}${categoryQuery}${difficultyQuery}`
    ).then((res) => res.json());

    console.log(questionsJSON);

    setQuestions(questionsJSON);
    setStatus("playing");
  }

  const isChoosing = status === "choosing";
  const isPlaying = status === "playing";
  const isFinished = status === "finished";

  return (
    <React.StrictMode>
      <main>
        <h1>Open Trivia DB Quiz</h1>
        {isChoosing && <InitialScreen onStart={handleStart} />}
        {isPlaying && <QuestionsSequence questions={questions} />}
        {isFinished && <FinalScreen />}
      </main>
    </React.StrictMode>
  );
}
