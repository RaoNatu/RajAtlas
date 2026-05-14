export function filterQuizzesByCategory(quizzes, category) {
  if (!category || category === "All") return quizzes;
  return quizzes.filter((quiz) => quiz.category === category);
}

export function shuffleArray(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function getScoreLabel(percentage) {
  if (percentage >= 90) return "Excellent";
  if (percentage >= 70) return "Strong";
  if (percentage >= 50) return "Building";
  return "Needs revision";
}

export function normalizeAnswer(answer) {
  return String(answer || "").trim().toLowerCase();
}

export function isAnswerCorrect(selectedAnswer, correctAnswer) {
  return normalizeAnswer(selectedAnswer) === normalizeAnswer(correctAnswer);
}
