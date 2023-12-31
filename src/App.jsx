import React, { useEffect, useState } from "react";
import QuizForm from "./components/QuizForm";
import QuestionsSequence from "./components/QuestionsSequence";
import QuizFinishedScreen from "./components/QuizFinishedScreen";
import reportError from "./utils/reportError";
import {
  fetchQuestions,
  fetchCategories,
  fetchQuestionCounts,
} from "./utils/fetch";

export default function App() {
  /* choosing, answering, finished */
  const [status, setStatus] = useState("choosing");
  const [questions, setQuestions] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [isTimeLimitOn, setIsTimeLimitOn] = useState(true);

  const [categories, setCategories] = useState([]);
  const [areCategoriesLoading, setAreCategoriesLoading] = useState(false);
  const [questionCounts, setQuestionCounts] = useState([]);

  useEffect(() => {
    let ignore = false;

    setAreCategoriesLoading(true);
    fetchCategories()
      .then((categories) => {
        if (!ignore) {
          setCategories(categories);
          setAreCategoriesLoading(false);
        }
        return fetchQuestionCounts(categories);
      })
      .then((questionCounts) => {
        if (!ignore) setQuestionCounts(questionCounts);
      })
      .catch((reason) => {
        reportError(reason);
        setAreCategoriesLoading(false);
      });

    return () => {
      ignore = true;
      setAreCategoriesLoading(false);
    };
  }, []);

  async function handleStart(amount, categoryId, difficulty) {
    setIsLoadingQuestions(true);

    try {
      const questionsResult = await fetchQuestions(
        amount,
        categoryId,
        difficulty
      );
      setQuestions(questionsResult);
      setStatus("answering");
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
  const isPlaying = status === "answering";
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
              categories={categories}
              questionCounts={questionCounts}
              areCategoriesLoading={areCategoriesLoading}
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
            href="https://rafaeldevvv.github.io/portfolio"
          >
            Rafael Maia
          </a>
          .
        </p>
      </footer>
    </React.StrictMode>
  );
}
