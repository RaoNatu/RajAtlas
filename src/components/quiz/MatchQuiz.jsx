import { CheckCircle2, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import Badge from "../common/Badge";
import Button from "../common/Button";
import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";
import { shuffleArray } from "../../utils/quizHelpers";

export default function MatchQuiz({ quiz, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const options = useMemo(() => shuffleArray(quiz?.pairs?.map((pair) => pair.right) || []), [quiz]);

  if (!quiz) return null;

  const total = quiz.pairs.length;
  const score = quiz.pairs.filter((pair) => answers[pair.left] === pair.right).length;
  const percentage = Math.round((score / total) * 100);

  function checkAnswers() {
    setChecked(true);
    onComplete?.({
      id: quiz.id,
      category: quiz.category,
      score,
      total,
    });
  }

  function restart() {
    setAnswers({});
    setChecked(false);
  }

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge color="blue">{quiz.category}</Badge>
          <Badge color="sand">match</Badge>
        </div>
        <span className="text-sm font-bold text-desert-600">{total} pairs</span>
      </div>
      <h2 className="mt-4 text-2xl font-black text-desert-900">{quiz.title}</h2>
      <p className="mt-2 text-sm leading-6 text-desert-700">{quiz.prompt}</p>

      <div className="mt-6 grid gap-3">
        {quiz.pairs.map((pair) => {
          const isCorrect = checked && answers[pair.left] === pair.right;
          const isWrong = checked && answers[pair.left] && answers[pair.left] !== pair.right;

          return (
            <div
              key={pair.left}
              className={[
                "grid gap-3 rounded-lg border p-3 sm:grid-cols-[1fr_1.3fr]",
                isCorrect
                  ? "border-emerald-200 bg-emerald-50"
                  : isWrong
                    ? "border-maroon-200 bg-maroon-50"
                    : "border-desert-200 bg-white",
              ].join(" ")}
            >
              <div className="flex items-center font-black text-desert-900">
                {pair.left}
              </div>
              <select
                value={answers[pair.left] || ""}
                disabled={checked}
                onChange={(event) =>
                  setAnswers((current) => ({
                    ...current,
                    [pair.left]: event.target.value,
                  }))
                }
                className="h-11 rounded-lg border border-desert-200 bg-white px-3 text-sm font-semibold text-desert-900 outline-none focus:border-royal-400 focus:ring-4 focus:ring-royal-100"
              >
                <option value="">Choose match</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>

      {checked ? (
        <div className="mt-6 rounded-lg border border-royal-100 bg-royal-50 p-4">
          <div className="flex items-center gap-2 font-black text-royal-900">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            Score: {score} / {total}
          </div>
          <ProgressBar className="mt-4" value={percentage} label="Match accuracy" />
          <p className="mt-3 text-sm leading-6 text-royal-900">{quiz.explanation}</p>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap justify-end gap-3">
        {checked ? (
          <Button variant="secondary" icon={RotateCcw} onClick={restart}>
            Restart match
          </Button>
        ) : (
          <Button onClick={checkAnswers}>
            {Object.keys(answers).length === total ? "Check matches" : "Check partial matches"}
          </Button>
        )}
      </div>
    </Card>
  );
}
