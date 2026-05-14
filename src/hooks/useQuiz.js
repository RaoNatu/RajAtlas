import { useMemo, useState } from "react";
import { isAnswerCorrect } from "../utils/quizHelpers";

export function useQuiz(questions = []) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentIndex];
  const score = useMemo(
    () => answers.filter((answer) => answer.isCorrect).length,
    [answers],
  );

  const isAnswered = answers.some((answer) => answer.questionId === currentQuestion?.id);
  const selectedRecord = answers.find((answer) => answer.questionId === currentQuestion?.id);

  function submitAnswer(answer = selectedAnswer) {
    if (!currentQuestion || !answer) return;
    const isCorrect = isAnswerCorrect(answer, currentQuestion.correctAnswer);

    setAnswers((current) => {
      const withoutCurrent = current.filter(
        (item) => item.questionId !== currentQuestion.id,
      );
      return [
        ...withoutCurrent,
        {
          questionId: currentQuestion.id,
          answer,
          isCorrect,
          category: currentQuestion.category,
        },
      ];
    });
  }

  function nextQuestion() {
    setSelectedAnswer("");
    if (currentIndex >= questions.length - 1) {
      setIsComplete(true);
      return;
    }
    setCurrentIndex((index) => index + 1);
  }

  function restartQuiz() {
    setCurrentIndex(0);
    setSelectedAnswer("");
    setAnswers([]);
    setIsComplete(false);
  }

  return {
    currentIndex,
    currentQuestion,
    selectedAnswer,
    setSelectedAnswer,
    answers,
    selectedRecord,
    isAnswered,
    isComplete,
    score,
    submitAnswer,
    nextQuestion,
    restartQuiz,
  };
}
