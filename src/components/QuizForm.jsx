import React, { useEffect, useState } from "react";
import capitalize from "../utils/capitalize";
import fetchQuestionCount from "../utils/fetchQuestionCount";
import reportError from "../utils/reportError";
import useFetch from "../custom-hooks/useFetch";
import Select from "./Select";
import AmountInput from "./AmountInput";
import FormField from "./FormField";
import CategorySelect from "./CategorySelect";
import TimeLimitToggle from "./TimeLimitToggle";
import LiveParagraph from "./LiveParagraph";
import Spinner from "./Spinner";
import Button from "./Button";

export default function QuizForm({
  onStart,
  isTimeLimitOn,
  onToggleTimeLimit,
  isLoadingQuestions,
  categories,
  questionCounts,
  areCategoriesLoading
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [questionAmount, setQuestionAmount] = useState("");

  const difficulties = ["easy", "medium", "hard"].map((d) => ({
    id: d,
    name: capitalize(d),
  }));

  function getCategoryQuestionCount(id, difficulty) {
    let categoryQuestionCount = questionCounts.find(
      (qc) => qc.categoryId === id
    );

    return categoryQuestionCount.count[difficulty];
  }

  let maxNumberOfQuestions = 50;
  /* if the question counts have been retrieved and the user has selected a category */
  if (questionCounts && selectedCategoryId) {
    maxNumberOfQuestions = getCategoryQuestionCount(
      selectedCategoryId,
      selectedDifficulty || "total" // defaults to the count of all questions
    );
  }

  let selectedCategoryName = "any category";
  if (categories) {
    selectedCategoryName = categories.find(
      (c) => c.id == selectedCategoryId
    ).name;
  }

  const displayMaxNumAlert =
    !!questionCounts && !!selectedCategoryId && maxNumberOfQuestions < 50;

  return (
    <form
      className="initial-form"
      onSubmit={(event) => {
        event.preventDefault();
        onStart(Number(questionAmount), selectedCategoryId, selectedDifficulty);
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
          max={Math.min(maxNumberOfQuestions, 50)} // maximum of 50 questions per call
        />
      </FormField>

      {displayMaxNumAlert ? (
        <LiveParagraph
          text={`${maxNumberOfQuestions} questions available for ${selectedCategoryName}, ${
            selectedDifficulty || "any"
          } difficulty`}
          type="calm"
        />
      ) : (
        <LiveParagraph
          text={`50+ questions available for ${selectedCategoryName}, ${
            selectedDifficulty || "any"
          } difficulty`}
        />
      )}

      <TimeLimitToggle
        onToggleTimeLimit={onToggleTimeLimit}
        isTimeLimitOn={isTimeLimitOn}
      />

      <div className="flex align-center gap-1">
        <Button
          type="submit"
          label="Start quiz"
          disabled={isLoadingQuestions || !questionAmount}
        />
        {isLoadingQuestions && <Spinner size={20} loadingTarget="questions" />}
      </div>
    </form>
  );
}
