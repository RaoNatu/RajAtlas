import { CheckCircle2, Circle, XCircle } from "lucide-react";
import Badge from "../common/Badge";
import Button from "../common/Button";
import Card from "../common/Card";
import { useLanguage } from "../../contexts/LanguageContext";

export default function QuizCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  onSubmit,
  isAnswered,
  selectedRecord,
  onNext,
  currentIndex,
  total,
}) {
  const { t } = useLanguage();
  if (!question) return null;

  const correct = selectedRecord?.isCorrect;

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge color="blue">{t(`category.${question.category}`)}</Badge>
          <Badge color="sand">{t(`type.${question.type}`)}</Badge>
        </div>
        <span className="text-sm font-bold text-desert-600">
          {currentIndex + 1} / {total}
        </span>
      </div>

      <h2 className="mt-5 text-2xl font-black leading-tight text-desert-900">
        {question.question}
      </h2>

      <div className="mt-6 grid gap-3">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option || selectedRecord?.answer === option;
          const isCorrectAnswer = option === question.correctAnswer;
          const showCorrect = isAnswered && isCorrectAnswer;
          const showIncorrect = isAnswered && isSelected && !isCorrectAnswer;

          return (
            <button
              key={option}
              type="button"
              disabled={isAnswered}
              onClick={() => onSelectAnswer(option)}
              className={[
                "flex min-h-12 items-center justify-between rounded-lg border px-4 py-3 text-left text-sm font-semibold transition",
                showCorrect
                  ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                  : showIncorrect
                    ? "border-maroon-300 bg-maroon-50 text-maroon-900"
                    : isSelected
                      ? "border-royal-400 bg-royal-50 text-royal-900"
                      : "border-desert-200 bg-white text-desert-900 hover:border-royal-300 hover:bg-royal-50/50",
              ].join(" ")}
            >
              <span>{option}</span>
              {showCorrect ? (
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              ) : showIncorrect ? (
                <XCircle className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Circle className="h-4 w-4 text-desert-300" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>

      {isAnswered ? (
        <div
          className={[
            "mt-6 rounded-lg border p-4",
            correct
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-maroon-200 bg-maroon-50 text-maroon-900",
          ].join(" ")}
        >
          <p className="font-black">{correct ? t("correct") : t("reviewThis")}</p>
          <p className="mt-1 text-sm leading-6">{question.explanation}</p>
        </div>
      ) : null}

      <div className="mt-6 flex justify-end gap-3">
        {!isAnswered ? (
          <Button disabled={!selectedAnswer} onClick={() => onSubmit(selectedAnswer)}>
            {t("checkAnswer")}
          </Button>
        ) : (
          <Button onClick={onNext}>
            {currentIndex + 1 === total ? t("seeResult") : t("nextQuestion")}
          </Button>
        )}
      </div>
    </Card>
  );
}
