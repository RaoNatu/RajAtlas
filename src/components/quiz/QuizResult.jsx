import { RotateCcw, Trophy } from "lucide-react";
import Badge from "../common/Badge";
import Button from "../common/Button";
import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";
import { getScoreLabel } from "../../utils/quizHelpers";

export default function QuizResult({ score, total, onRestart, title = "Quiz result" }) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <Card className="p-6 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
        <Trophy className="h-7 w-7" aria-hidden="true" />
      </div>
      <Badge className="mt-5" color={percentage >= 70 ? "green" : "gold"}>
        {getScoreLabel(percentage)}
      </Badge>
      <h2 className="mt-4 text-3xl font-black text-desert-900">{title}</h2>
      <p className="mt-2 text-sm font-semibold text-desert-700">
        You scored {score} out of {total}.
      </p>
      <ProgressBar className="mx-auto mt-6 max-w-md" value={percentage} label="Score" />
      <Button className="mt-6" variant="secondary" icon={RotateCcw} onClick={onRestart}>
        Restart quiz
      </Button>
    </Card>
  );
}
