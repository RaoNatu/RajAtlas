import MCQQuiz from "./MCQQuiz";

export default function TrueFalseQuiz({ questions, onComplete }) {
  return (
    <MCQQuiz
      questions={questions}
      quizId="true-false-session"
      onComplete={onComplete}
    />
  );
}
