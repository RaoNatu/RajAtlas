import { useEffect, useMemo, useRef } from "react";
import { useQuiz } from "../../hooks/useQuiz";
import { useLanguage } from "../../contexts/LanguageContext";
import QuizCard from "./QuizCard";
import QuizResult from "./QuizResult";

export default function MCQQuiz({ questions, quizId = "mcq-session", onComplete }) {
  const { t } = useLanguage();
  const reportRef = useRef(false);
  const sessionCategory = useMemo(
    () => questions[0]?.category || "Rajasthan Introduction",
    [questions],
  );
  const quiz = useQuiz(questions);

  useEffect(() => {
    reportRef.current = false;
  }, [quizId, questions]);

  useEffect(() => {
    if (quiz.isComplete && !reportRef.current) {
      reportRef.current = true;
      onComplete?.({
        id: quizId,
        category: sessionCategory,
        score: quiz.score,
        total: questions.length,
      });
    }
  }, [quiz.isComplete, quiz.score, questions.length, onComplete, quizId, sessionCategory]);

  if (!questions.length) return null;

  if (quiz.isComplete) {
    return (
      <QuizResult
        score={quiz.score}
        total={questions.length}
        onRestart={() => {
          reportRef.current = false;
          quiz.restartQuiz();
        }}
        title={t("quizComplete")}
      />
    );
  }

  return (
    <QuizCard
      question={quiz.currentQuestion}
      selectedAnswer={quiz.selectedAnswer}
      onSelectAnswer={quiz.setSelectedAnswer}
      onSubmit={quiz.submitAnswer}
      isAnswered={quiz.isAnswered}
      selectedRecord={quiz.selectedRecord}
      onNext={quiz.nextQuestion}
      currentIndex={quiz.currentIndex}
      total={questions.length}
    />
  );
}
