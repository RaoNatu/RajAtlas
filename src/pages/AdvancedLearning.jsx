import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Bookmark,
  Brain,
  CheckCircle2,
  Search,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import ProgressBar from "../components/common/ProgressBar";
import SearchBar from "../components/common/SearchBar";
import StatsCard from "../components/dashboard/StatsCard";
import PageHeader from "../components/layout/PageHeader";
import Flashcard from "../components/learning/Flashcard";
import {
  achievementBadges,
  dailyChallenges,
  flashcards,
  revisionPrompts,
} from "../data/advancedLearning";
import { useProgress } from "../hooks/useProgress";
import { getCategoryAverages, getModuleCompletion } from "../utils/calculateProgress";
import { searchAtlas } from "../utils/searchAtlas";

const tabs = [
  { id: "search", label: "Search", icon: Search },
  { id: "bookmarks", label: "Bookmarks", icon: Bookmark },
  { id: "flashcards", label: "Flashcards", icon: Brain },
  { id: "revision", label: "Revision", icon: Target },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const scopes = ["All", "Map", "Regions", "Geography", "Economy", "Politics", "History", "Culture"];
const chartColors = ["#1c5fc4", "#bf7327", "#9f1736", "#0f766e", "#7c3aed", "#d9953f"];

export default function AdvancedLearning() {
  const [activeTab, setActiveTab] = useState("search");
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState("All");
  const {
    progress,
    completionPercentage,
    strongAreas,
    weakAreas,
    level,
    setLastOpenedModule,
    toggleBookmark,
    isBookmarked,
    recordFlashcardReview,
    completeDailyChallenge,
  } = useProgress();

  useEffect(() => {
    setLastOpenedModule("Revision Lab");
  }, [setLastOpenedModule]);

  const results = useMemo(() => searchAtlas(query, scope), [query, scope]);
  const categoryAverages = useMemo(
    () => getCategoryAverages(progress.quizScores || []),
    [progress.quizScores],
  );
  const moduleCompletion = useMemo(
    () => getModuleCompletion(progress.completedTopics || []),
    [progress.completedTopics],
  );
  const savedFlashcards = progress.bookmarks.filter((item) => item.type === "Flashcard");
  const nextLevelProgress = Math.min(100, progress.xp % 100);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Phase 7"
        title="Advanced Learning Lab"
        description="Search the atlas, save bookmarks, revise flashcards, complete daily challenges, and track quiz analytics from localStorage."
        badge="Local-first"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          label="XP level"
          value={level}
          helper={`${progress.xp || 0} XP collected locally.`}
          icon={Zap}
          tone="blue"
        />
        <StatsCard
          label="Study streak"
          value={progress.streak || 0}
          helper="Updates when you study, quiz, or review."
          icon={Sparkles}
          tone="green"
        />
        <StatsCard
          label="Bookmarks"
          value={progress.bookmarks.length}
          helper="Districts, topics, and flashcards saved."
          icon={Bookmark}
          tone="sand"
        />
        <StatsCard
          label="Badges"
          value={progress.badges.length}
          helper={progress.badges.join(", ") || "Earn badges by learning."}
          icon={Trophy}
          tone="maroon"
        />
      </div>

      <Card className="mt-6 p-4">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "primary" : "outline"}
                size="sm"
                icon={Icon}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            );
          })}
        </div>
      </Card>

      {activeTab === "search" ? (
        <SearchPanel
          query={query}
          setQuery={setQuery}
          scope={scope}
          setScope={setScope}
          results={results}
          toggleBookmark={toggleBookmark}
          isBookmarked={isBookmarked}
        />
      ) : null}

      {activeTab === "bookmarks" ? (
        <BookmarksPanel bookmarks={progress.bookmarks} toggleBookmark={toggleBookmark} />
      ) : null}

      {activeTab === "flashcards" ? (
        <FlashcardsPanel
          bookmarks={progress.bookmarks}
          recordFlashcardReview={recordFlashcardReview}
          toggleBookmark={toggleBookmark}
          isBookmarked={isBookmarked}
        />
      ) : null}

      {activeTab === "revision" ? (
        <RevisionPanel
          weakAreas={weakAreas}
          strongAreas={strongAreas}
          mistakes={progress.mistakes}
          savedFlashcards={savedFlashcards}
          completeDailyChallenge={completeDailyChallenge}
          completions={progress.dailyChallengeCompletions}
        />
      ) : null}

      {activeTab === "analytics" ? (
        <AnalyticsPanel
          completionPercentage={completionPercentage}
          nextLevelProgress={nextLevelProgress}
          categoryAverages={categoryAverages}
          moduleCompletion={moduleCompletion}
          badges={progress.badges}
        />
      ) : null}
    </div>
  );
}

function SearchPanel({
  query,
  setQuery,
  scope,
  setScope,
  results,
  toggleBookmark,
  isBookmarked,
}) {
  return (
    <section className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
      <Card className="h-fit p-5">
        <SearchBar value={query} onChange={setQuery} placeholder="Search districts, rivers, forts..." />
        <label className="mt-4 block text-sm font-bold text-desert-700" htmlFor="search-scope">
          Scope
        </label>
        <select
          id="search-scope"
          value={scope}
          onChange={(event) => setScope(event.target.value)}
          className="mt-2 h-11 w-full rounded-lg border border-desert-200 bg-white px-3 text-sm font-semibold text-desert-900 outline-none focus:border-royal-400 focus:ring-4 focus:ring-royal-100"
        >
          {scopes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {results.map((item) => {
          const saved = isBookmarked(item.id);
          return (
            <Card key={item.id} className="flex h-full flex-col p-5" interactive>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge color="blue">{item.module}</Badge>
                  <h3 className="mt-3 text-lg font-black text-desert-900">{item.title}</h3>
                </div>
                <Button
                  variant={saved ? "primary" : "outline"}
                  size="icon"
                  icon={Bookmark}
                  aria-label={saved ? "Remove bookmark" : "Save bookmark"}
                  onClick={() =>
                    toggleBookmark({
                      id: item.id,
                      title: item.title,
                      type: item.type,
                      category: item.module,
                      path: item.path,
                    })
                  }
                />
              </div>
              <p className="mt-3 flex-1 text-sm leading-6 text-desert-700">{item.description}</p>
              <Link
                to={item.path}
                className="mt-4 inline-flex text-sm font-black text-royal-800 hover:text-royal-900"
              >
                Open module
              </Link>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function BookmarksPanel({ bookmarks, toggleBookmark }) {
  return (
    <section className="mt-6">
      {bookmarks.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {bookmarks.map((item) => (
            <Card key={`${item.id}-${item.savedAt}`} className="p-5" interactive>
              <Badge color="gold">{item.type}</Badge>
              <h3 className="mt-3 text-lg font-black text-desert-900">{item.title}</h3>
              <p className="mt-2 text-sm font-semibold text-desert-600">{item.category}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.path ? (
                  <Link
                    to={item.path}
                    className="inline-flex h-9 items-center justify-center rounded-lg bg-desert-100 px-3 text-sm font-semibold text-desert-900 hover:bg-desert-200"
                  >
                    Open
                  </Link>
                ) : null}
                <Button
                  variant="outline"
                  size="sm"
                  icon={Bookmark}
                  onClick={() => toggleBookmark(item)}
                >
                  Remove
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <Bookmark className="mx-auto h-8 w-8 text-royal-700" aria-hidden="true" />
          <h2 className="mt-3 text-xl font-black text-desert-900">No bookmarks yet</h2>
          <p className="mt-2 text-sm leading-6 text-desert-700">
            Save districts, cards, and flashcards to build a personal revision list.
          </p>
        </Card>
      )}
    </section>
  );
}

function FlashcardsPanel({
  recordFlashcardReview,
  toggleBookmark,
  isBookmarked,
}) {
  return (
    <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {flashcards.map((card) => {
        const saved = isBookmarked(card.id);
        return (
          <div key={card.id} className="space-y-3">
            <Flashcard front={card.front} back={card.back} />
            <div className="grid grid-cols-3 gap-2">
              <Button size="sm" variant="secondary" onClick={() => recordFlashcardReview(card.id, false)}>
                Again
              </Button>
              <Button size="sm" variant="primary" icon={CheckCircle2} onClick={() => recordFlashcardReview(card.id, true)}>
                Know
              </Button>
              <Button
                size="sm"
                variant={saved ? "primary" : "outline"}
                icon={Bookmark}
                onClick={() =>
                  toggleBookmark({
                    id: card.id,
                    title: card.front,
                    type: "Flashcard",
                    category: card.category,
                    path: "/learn",
                  })
                }
              >
                Save
              </Button>
            </div>
          </div>
        );
      })}
    </section>
  );
}

function RevisionPanel({
  weakAreas,
  strongAreas,
  mistakes,
  savedFlashcards,
  completeDailyChallenge,
  completions,
}) {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <section className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <Card className="p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
          Daily challenges
        </p>
        <h2 className="mt-2 text-2xl font-black text-desert-900">Earn XP today</h2>
        <div className="mt-6 space-y-3">
          {dailyChallenges.map((challenge) => {
            const done = completions.some((item) => item.id === challenge.id && item.date === today);
            return (
              <div key={challenge.id} className="rounded-lg bg-desert-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <Badge color="blue">{challenge.category}</Badge>
                    <h3 className="mt-2 font-black text-desert-900">{challenge.title}</h3>
                  </div>
                  <Button
                    size="sm"
                    variant={done ? "secondary" : "primary"}
                    icon={done ? CheckCircle2 : Zap}
                    onClick={() => completeDailyChallenge(challenge)}
                    disabled={done}
                  >
                    {done ? "Done" : `+${challenge.rewardXp} XP`}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
          Weak-topic revision
        </p>
        <h2 className="mt-2 text-2xl font-black text-desert-900">
          Mistake-based practice queue
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <AreaList title="Weak areas" items={weakAreas} empty="Weak areas appear after quiz attempts below 70%." />
          <AreaList title="Strong areas" items={strongAreas} empty="Strong areas appear after quiz attempts above 70%." />
        </div>
        <div className="mt-5 grid gap-3">
          {mistakes.length ? (
            mistakes.slice(0, 4).map((mistake) => (
              <div key={mistake.id} className="rounded-lg bg-desert-50 p-3 text-sm font-semibold text-desert-800">
                {mistake.category}: {mistake.missed} missed out of {mistake.total}
              </div>
            ))
          ) : (
            <p className="rounded-lg border border-dashed border-desert-300 bg-desert-50 p-4 text-sm leading-6 text-desert-700">
              Missed-question summaries will appear after quizzes.
            </p>
          )}
        </div>
      </Card>

      <Card className="p-6 lg:col-span-2">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
              Revision prompts
            </p>
            <div className="mt-4 grid gap-2">
              {revisionPrompts.map((prompt) => (
                <div key={prompt} className="rounded-lg bg-desert-50 p-3 text-sm font-semibold text-desert-800">
                  {prompt}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
              Saved flashcards
            </p>
            <div className="mt-4 grid gap-2">
              {savedFlashcards.length ? (
                savedFlashcards.map((card) => (
                  <div key={card.id} className="rounded-lg bg-royal-50 p-3 text-sm font-semibold text-royal-900">
                    {card.title}
                  </div>
                ))
              ) : (
                <p className="rounded-lg border border-dashed border-desert-300 bg-desert-50 p-4 text-sm leading-6 text-desert-700">
                  Save flashcards to make this lane personal.
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

function AnalyticsPanel({
  completionPercentage,
  nextLevelProgress,
  categoryAverages,
  moduleCompletion,
  badges,
}) {
  return (
    <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <Card className="p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
          Learning progress
        </p>
        <h2 className="mt-2 text-2xl font-black text-desert-900">Completion and XP</h2>
        <ProgressBar className="mt-6" value={completionPercentage} label="Overall atlas completion" />
        <ProgressBar className="mt-5" value={nextLevelProgress} label="Next level XP" />
        <div className="mt-6 grid gap-3">
          {achievementBadges.map((badge) => (
            <div key={badge.id} className="flex items-center justify-between gap-3 rounded-lg bg-desert-50 p-3">
              <div>
                <p className="font-black text-desert-900">{badge.label}</p>
                <p className="text-xs font-semibold text-desert-600">{badge.requirement}</p>
              </div>
              <Badge color={badges.includes(badge.label) ? "green" : "sand"}>
                {badges.includes(badge.label) ? "Earned" : "Locked"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
          Quiz analytics
        </p>
        <h2 className="mt-2 text-2xl font-black text-desert-900">Average score by category</h2>
        {categoryAverages.length ? (
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryAverages} margin={{ top: 8, right: 12, left: -18, bottom: 34 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#efd5a6" />
                <XAxis
                  dataKey="category"
                  angle={-16}
                  textAnchor="end"
                  interval={0}
                  tick={{ fill: "#743b1c", fontSize: 12, fontWeight: 700 }}
                />
                <YAxis domain={[0, 100]} tick={{ fill: "#743b1c", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="average" radius={[8, 8, 0, 0]}>
                  {categoryAverages.map((entry, index) => (
                    <Cell key={entry.category} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="mt-6 rounded-lg border border-dashed border-desert-300 bg-desert-50 p-5 text-sm leading-6 text-desert-700">
            Quiz analytics will appear after your first quiz attempt.
          </p>
        )}
      </Card>

      <Card className="p-6 lg:col-span-2">
        <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
          Module completion
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
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
    </section>
  );
}

function AreaList({ title, items, empty }) {
  return (
    <div>
      <h3 className="font-black text-desert-900">{title}</h3>
      <div className="mt-3 space-y-2">
        {items.length ? (
          items.map((item) => (
            <div key={item.category} className="flex items-center justify-between rounded-lg bg-white p-3">
              <span className="text-sm font-bold text-desert-900">{item.category}</span>
              <Badge color={item.average >= 70 ? "green" : "gold"}>{item.average}%</Badge>
            </div>
          ))
        ) : (
          <p className="rounded-lg border border-dashed border-desert-300 bg-white p-3 text-sm leading-6 text-desert-700">
            {empty}
          </p>
        )}
      </div>
    </div>
  );
}
