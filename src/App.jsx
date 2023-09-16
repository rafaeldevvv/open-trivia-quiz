import React, { useState } from "react";
import QuizForm from "./components/QuizForm";
import QuestionsSequence from "./components/QuestionsSequence";
import QuizFinishedScreen from "./components/QuizFinishedScreen";
import reportError from "./utils/reportError";
import fetchQuestions from "./utils/fetchQuestions";

export default function App() {
  /* choosing, playing, finished */
  const [status, setStatus] = useState("choosing");
  const [questions, setQuestions] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  const [isTimeLimitOn, setIsTimeLimitOn] = useState(true);

  async function handleStart(amount, categoryId, difficulty) {
    setIsLoadingQuestions(true);

    try {
      const questionsResult = await fetchQuestions(
        amount,
        categoryId,
        difficulty
      );
      setQuestions(questionsResult);
      setStatus("playing");
    } catch (err) {
      reportError(err);
    } finally {
      setIsLoadingQuestions(false);
    }
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
            <QuizForm
              onStart={handleStart}
              isTimeLimitOn={isTimeLimitOn}
              onToggleTimeLimit={setIsTimeLimitOn}
              isLoadingQuestions={isLoadingQuestions}
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
            <QuizFinishedScreen
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
