import React, { useState } from "react";
import InitialScreen from "./components/InitialScreen";
import QuestionsSequence from "./components/QuestionsSequence";
import FinalScreen from "./components/FinalScreen";
import decodeQuestion from "./utils/decodeQuestion.js";

export default function App() {
  /* choosing, playing, finished */
  const [status, setStatus] = useState("choosing");
  const [questions, setQuestions] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const [isTimeLimitOn, setIsTimeLimitOn] = useState(true);

  async function handleStart(categoryId, difficulty, amount) {
    const categoryQuery = categoryId ? `&category=${categoryId}` : "";
    const difficultyQuery = difficulty ? `&difficulty=${difficulty}` : "";

    const questionsJSON = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&encode=url3986${categoryQuery}${difficultyQuery}`
    )
      .then((res) => res.json())
      .catch(alert);

    setQuestions(questionsJSON.results.map(decodeQuestion));
    setStatus("playing");
  }

  function handleEnd() {
    setStatus("finished");
  }

  function handlePlayAgain() {
    setStatus("choosing");
    setAnsweredQuestions([]);
    setQuestions(null);
  }

  const isChoosing = status === "choosing";
  const isPlaying = status === "playing";
  const isFinished = status === "finished";

  const options = ["A", "B", "C", "D", "E"];

  return (
    <React.StrictMode>
      <header>
        <h1>Open Trivia DB Quiz</h1>
      </header>
      <main>
        <div aria-live="polite">
          {isChoosing && (
            <InitialScreen
              onStart={handleStart}
              isTimeLimitOn={isTimeLimitOn}
              onToggleTimeLimit={setIsTimeLimitOn}
            />
          )}
          {isPlaying && questions && (
            <QuestionsSequence
              questions={questions}
              isTimeLimitOn={isTimeLimitOn}
              onConfirmAnswer={(answeredQuestion) => {
                setAnsweredQuestions((aqs) => [...aqs, answeredQuestion]);
              }}
              onEnd={handleEnd}
              options={options}
            />
          )}
          {isFinished && (
            <FinalScreen
              answeredQuestions={answeredQuestions}
              questions={questions}
              options={options}
              onPlayAgain={handlePlayAgain}
            />
          )}
        </div>
      </main>
      <footer>
        <p>
          Coded by{" "}
          <a
            title="Rafael Maia's github page"
            href="https://github.com/rafaeldevvv"
          >
            Rafael Maia
          </a>
          .
        </p>
      </footer>
    </React.StrictMode>
  );
}
