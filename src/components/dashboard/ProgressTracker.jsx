import { Award, BookOpen, Target } from "lucide-react";
import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";

export default function ProgressTracker({ progress, completionPercentage }) {
  const latestScore = progress.quizScores?.[0];

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            Progress overview
          </p>
          <h2 className="mt-2 text-2xl font-black text-desert-900">
            Introduction module
          </h2>
        </div>
        <div className="rounded-lg bg-desert-100 p-3 text-desert-900">
          <Target className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>

      <ProgressBar
        className="mt-6"
        label="Completion"
        value={completionPercentage}
      />

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Metric
          icon={BookOpen}
          label="Topics"
          value={progress.completedTopics?.length || 0}
        />
        <Metric
          icon={Award}
          label="Last score"
          value={latestScore ? `${latestScore.percentage}%` : "0%"}
        />
        <Metric
          icon={Target}
          label="Badges"
          value={progress.badges?.length || 0}
        />
      </div>
    </Card>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-desert-100 bg-desert-50 p-3">
      <Icon className="mb-2 h-4 w-4 text-royal-700" aria-hidden="true" />
      <p className="text-xs font-semibold text-desert-600">{label}</p>
      <p className="text-lg font-black text-desert-900">{value}</p>
    </div>
  );
}
