import { useMemo } from "react";
import {
  Award,
  BarChart3,
  BookOpen,
  Bookmark,
  RotateCcw,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import PageHeader from "../components/layout/PageHeader";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import ProgressBar from "../components/common/ProgressBar";
import StatsCard from "../components/dashboard/StatsCard";
import { useProgress } from "../hooks/useProgress";
import { getCategoryAverages, getModuleCompletion } from "../utils/calculateProgress";

const COLORS = ["#1c5fc4", "#bf7327", "#9f1736", "#0f766e", "#7c3aed"];

export default function Progress() {
  const {
    progress,
    completionPercentage,
    strongAreas,
    weakAreas,
    level,
    resetProgress,
  } = useProgress();

  const categoryAverages = useMemo(
    () => getCategoryAverages(progress.quizScores || []),
    [progress.quizScores],
  );
  const moduleCompletion = useMemo(
    () => getModuleCompletion(progress.completedTopics || []),
    [progress.completedTopics],
  );
  const totalKnownTopics = moduleCompletion.reduce((sum, module) => sum + module.total, 0);
  const completedKnownTopics = moduleCompletion.reduce((sum, module) => sum + module.completed, 0);
  const latestScore = progress.quizScores?.[0];
  const completionData = [
    { name: "Completed", value: completionPercentage },
    { name: "Remaining", value: Math.max(0, 100 - completionPercentage) },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Progress Tracker"
        description="A localStorage-based learning dashboard for completion, XP, bookmarks, quiz scores, strong areas, weak areas, and recent study activity."
        badge="Phase 7"
        actions={
          <Button variant="secondary" icon={RotateCcw} onClick={resetProgress}>
            Reset progress
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          label="Overall completion"
          value={`${completionPercentage}%`}
          helper={`${completedKnownTopics} of ${totalKnownTopics} known topics completed.`}
          icon={Target}
          tone="blue"
        />
        <StatsCard
          label="XP level"
          value={level}
          helper={`${progress.xp || 0} XP and ${progress.streak || 0} day streak.`}
          icon={Zap}
          tone="green"
        />
        <StatsCard
          label="Quiz attempts"
          value={progress.quizScores?.length || 0}
          helper="Saved in this browser."
          icon={BarChart3}
          tone="sand"
        />
        <StatsCard
          label="Latest score"
          value={latestScore ? `${latestScore.percentage}%` : "0%"}
          helper={latestScore ? latestScore.category : "Attempt a quiz to begin."}
          icon={TrendingUp}
          tone="blue"
        />
        <StatsCard
          label="Badges"
          value={progress.badges?.length || 0}
          helper={progress.badges?.join(", ") || "Earn badges from quiz scores."}
          icon={Award}
          tone="maroon"
        />
        <StatsCard
          label="Bookmarks"
          value={progress.bookmarks?.length || 0}
          helper="Saved districts, topics, and flashcards."
          icon={Bookmark}
          tone="green"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
                Completion
              </p>
              <h2 className="mt-2 text-2xl font-black text-desert-900">
                Whole atlas
              </h2>
            </div>
            <Badge color="gold">{completedKnownTopics} / {totalKnownTopics} topics</Badge>
          </div>
          <ProgressBar className="mt-6" value={completionPercentage} label="Topic progress" />
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={completionData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={86}
                  paddingAngle={4}
                >
                  {completionData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={index === 0 ? "#1c5fc4" : "#efd5a6"}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            Quiz performance
          </p>
          <h2 className="mt-2 text-2xl font-black text-desert-900">
            Category averages
          </h2>
          {categoryAverages.length ? (
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryAverages} margin={{ top: 8, right: 8, left: -20, bottom: 50 }}>
                  <XAxis
                    dataKey="category"
                    angle={-20}
                    textAnchor="end"
                    interval={0}
                    tick={{ fill: "#743b1c", fontSize: 12, fontWeight: 700 }}
                  />
                  <YAxis tick={{ fill: "#743b1c", fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="average" radius={[8, 8, 0, 0]}>
                    {categoryAverages.map((entry, index) => (
                      <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="mt-6 rounded-lg border border-dashed border-desert-300 bg-desert-50 p-6 text-sm leading-6 text-desert-700">
              Quiz averages will appear after your first attempt.
            </div>
          )}
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <AreaList title="Strong areas" items={strongAreas} empty="Score 70% or higher to unlock strong areas." />
        <AreaList title="Weak areas" items={weakAreas} empty="Weak areas appear when a category average is below 70%." />
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-royal-700" aria-hidden="true" />
            <h2 className="text-xl font-black text-desert-900">Recently studied</h2>
          </div>
          <div className="mt-5 space-y-3">
            {progress.recentlyStudied?.length ? (
              progress.recentlyStudied.map((topic) => (
                <div key={`${topic.id}-${topic.studiedAt}`} className="rounded-lg bg-desert-50 p-3">
                  <p className="font-bold text-desert-900">{topic.title}</p>
                  <p className="mt-1 text-xs font-semibold text-desert-600">
                    {new Date(topic.studiedAt).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="rounded-lg border border-dashed border-desert-300 bg-desert-50 p-4 text-sm leading-6 text-desert-700">
                Mark map districts or fact cards as studied to build your revision trail.
              </p>
            )}
          </div>
        </Card>
      </div>

      <Card className="mt-8 p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
          Module progress
        </p>
        <h2 className="mt-2 text-2xl font-black text-desert-900">
          Completion by book section
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {moduleCompletion.map((module) => (
            <div key={module.module} className="rounded-lg bg-desert-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-black capitalize text-desert-900">{module.module}</h3>
                <Badge color="blue">{module.completed} / {module.total}</Badge>
              </div>
              <ProgressBar className="mt-4" value={module.percentage} label={`${module.module} progress`} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function AreaList({ title, items, empty }) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-black text-desert-900">{title}</h2>
      <div className="mt-5 space-y-3">
        {items.length ? (
          items.map((item) => (
            <div key={item.category} className="flex items-center justify-between rounded-lg bg-desert-50 p-3">
              <span className="font-bold text-desert-900">{item.category}</span>
              <Badge color={item.average >= 70 ? "green" : "gold"}>{item.average}%</Badge>
            </div>
          ))
        ) : (
          <p className="rounded-lg border border-dashed border-desert-300 bg-desert-50 p-4 text-sm leading-6 text-desert-700">
            {empty}
          </p>
        )}
      </div>
    </Card>
  );
}
