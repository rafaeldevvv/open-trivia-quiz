import React, { useEffect, useState } from "react";
import capitalize from "../utils/capitalize";
import useFetch from "../custom-hooks/useFetch";
import Select from "./Select";
import AmountInput from "./AmountInput";
import FormField from "./FormField";
import CategorySelect from "./CategorySelect";
import TimeLimitToggle from "./TimeLimitToggle";
import AlertParagraph from './AlertParagraph';

export default function InitialScreen({
  onStart,
  isTimeLimitOn,
  onToggleTimeLimit,
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [questionAmount, setQuestionAmount] = useState(20);
  const [questionCounts, setQuestionCounts] = useState(null);
  const [questionCountsError, setQuestionCountsError] = useState(null);

  const [categoriesObject, areCategoriesLoading, categoriesError] = useFetch(
    "https://opentdb.com/api_category.php"
  );
  const categories = categoriesObject?.trivia_categories;

  useEffect(() => {
    if (!categoriesObject) return;
    let ignore = false;

    async function fetchQuestionCounts() {
      const numbersOfCategoriesQuestions = await Promise.all(
        categories.map((c) => {
          /* fetch question count for a specific category */
          return fetch(`https://opentdb.com/api_count.php?category=${c.id}`)
            .then((response) => response.json())
            .catch(setQuestionCountsError);
        })
      );

      /* map the previous result to an array of different objects */
      const mapped = numbersOfCategoriesQuestions.map((n) => {
        const qc = n.category_question_count;

        return {
          category_id: n.category_id,
          count: {
            total: qc.total_question_count,
            easy: qc.total_easy_question_count,
            medium: qc.total_medium_question_count,
            hard: qc.total_hard_question_count,
          },
        };
      });

      if (!ignore) setQuestionCounts(mapped);
    }

    fetchQuestionCounts();
    return () => {
      ignore = true;
    };
  }, [categories]);

  const difficulties = ["easy", "medium", "hard"].map((d) => ({
    id: d,
    name: capitalize(d),
  }));

  function getCategoryQuestionCount(id, difficulty) {
    let categoryQuestionCount = questionCounts.find(
      (qc) => qc.category_id === id
    );

    return categoryQuestionCount.count[difficulty];
  }

  let maxNumberOfQuestions = null;
  /* if the question counts have been retrieved and the user has selected a category */
  if (questionCounts && selectedCategoryId) {
    maxNumberOfQuestions = getCategoryQuestionCount(
      selectedCategoryId, // defaults to general knowledge
      selectedDifficulty || "total" // defaults to the count of all questions
    );
  }

  const selectedCategoryName =
    categories?.find((c) => c.id == selectedCategoryId)?.name || "any category";

  const thereIsAnError = !!(categoriesError || questionCountsError);
  const displayMaxNumAlert = !!questionCounts && !!selectedCategoryId;

  return (
    <form
      className="initial-form"
      onSubmit={(event) => {
        event.preventDefault();
        onStart(selectedCategoryId, selectedDifficulty, questionAmount);
      }}
    >
      <CategorySelect
        selectedCategoryId={selectedCategoryId}
        isLoading={areCategoriesLoading}
        categories={categories}
        onChange={setSelectedCategoryId}
      />

      <FormField label="Difficulty" labelIsFor="difficulty-select">
        <Select
          value={selectedDifficulty}
          id="difficulty-select"
          defaultOption={"Any difficulty"}
          options={difficulties}
          onChange={(difficulty) =>
            setSelectedDifficulty(difficulty === "any" ? null : difficulty)
          }
        />
      </FormField>

      <FormField
        label="Number of questions (required)"
        labelIsFor="number-of-questions"
      >
        <AmountInput
          value={questionAmount}
          onChange={setQuestionAmount}
          max={maxNumberOfQuestions}
        />
      </FormField>

      {displayMaxNumAlert && (
        <AlertParagraph
          text={`${maxNumberOfQuestions} questions available for ${
            selectedCategoryName || "any category"
          }, ${selectedDifficulty || "any"} difficulty`}
          type="calm"
        />
      )}

      <TimeLimitToggle
        onToggleTimeLimit={onToggleTimeLimit}
        isTimeLimitOn={isTimeLimitOn}
      />

      {thereIsAnError && (
        <AlertParagraph
          text="Something went wrong when retrieving resources. Please try reloadingthe page."
          type="urgent"
        />
      )}

      <button type="submit" className="btn lightblue-btn" id="start-quiz-btn">
        Start quiz
      </button>
    </form>
  );
}
