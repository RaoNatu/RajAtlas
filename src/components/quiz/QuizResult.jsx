import { RotateCcw, Trophy } from "lucide-react";
import Badge from "../common/Badge";
import Button from "../common/Button";
import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";
import { useLanguage } from "../../contexts/LanguageContext";
import { getScoreLabel } from "../../utils/quizHelpers";

export default function QuizResult({ score, total, onRestart, title = "Quiz result" }) {
  const { t } = useLanguage();
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const scoreLabelKey = {
    Excellent: "scoreExcellent",
    Strong: "scoreStrong",
    Building: "scoreBuilding",
    "Needs revision": "scoreNeedsRevision",
  }[getScoreLabel(percentage)];

  return (
    <Card className="p-6 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
        <Trophy className="h-7 w-7" aria-hidden="true" />
      </div>
      <Badge className="mt-5" color={percentage >= 70 ? "green" : "gold"}>
        {t(scoreLabelKey)}
      </Badge>
      <h2 className="mt-4 text-3xl font-black text-desert-900">
        {title === "Quiz result" ? t("quizResult") : title}
      </h2>
      <p className="mt-2 text-sm font-semibold text-desert-700">
        {t("scoredOutOf", { score, total })}
      </p>
      <ProgressBar className="mx-auto mt-6 max-w-md" value={percentage} label={t("score", { score, total })} />
      <Button className="mt-6" variant="secondary" icon={RotateCcw} onClick={onRestart}>
        {t("restartQuiz")}
      </Button>
    </Card>
  );
}
