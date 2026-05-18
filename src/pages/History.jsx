import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bookmark,
  Castle,
  CheckCircle2,
  Clock3,
  MapPinned,
  ScrollText,
  Swords,
} from "lucide-react";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import PageHeader from "../components/layout/PageHeader";
import StatsCard from "../components/dashboard/StatsCard";
import Timeline from "../components/learning/Timeline";
import MCQQuiz from "../components/quiz/MCQQuiz";
import {
  ancientSites,
  historyPeriods,
  historyQuiz,
  integrationTimeline,
  medievalKingdoms,
  movementCards,
} from "../data/history";
import { useProgress } from "../hooks/useProgress";

export default function History() {
  const [activePeriodId, setActivePeriodId] = useState(historyPeriods[0].id);
  const [selectedSiteId, setSelectedSiteId] = useState(ancientSites[0].id);
  const {
    markTopicComplete,
    recordQuizScore,
    setLastOpenedModule,
    toggleBookmark,
    isBookmarked,
    progress,
  } = useProgress();

  useEffect(() => {
    setLastOpenedModule("History");
  }, [setLastOpenedModule]);

  const activePeriod = historyPeriods.find((period) => period.id === activePeriodId);
  const selectedSite = useMemo(
    () => ancientSites.find((site) => site.id === selectedSiteId) || ancientSites[0],
    [selectedSiteId],
  );
  const siteStudied = progress.completedTopics.includes(selectedSite.id);
  const siteSaved = isBookmarked(`history-${selectedSite.id}`);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Rajasthan history"
        title="History of Rajasthan"
        description="Study Rajasthan history through period lanes, ancient site cards, medieval kingdom anchors, movement stories, integration timeline, and recall quizzes."
        badge="History"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          label="History periods"
          value={historyPeriods.length}
          helper="Ancient, medieval, British, freedom, integration."
          icon={Clock3}
          tone="blue"
        />
        <StatsCard
          label="Ancient sites"
          value={ancientSites.length}
          helper="Map-positioned archaeology anchors."
          icon={MapPinned}
          tone="green"
        />
        <StatsCard
          label="Kingdom cards"
          value={medievalKingdoms.length}
          helper="Region-wise dynasty and fort recall."
          icon={Castle}
          tone="sand"
        />
        <StatsCard
          label="Movement cards"
          value={movementCards.length}
          helper="1857, peasant, tribal, and freedom activity."
          icon={Swords}
          tone="maroon"
        />
      </div>

      <section className="mt-8">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
              History timeline
            </p>
            <h2 className="mt-2 text-3xl font-black text-desert-900">
              Move through one era at a time
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {historyPeriods.map((period) => (
              <Button
                key={period.id}
                variant={activePeriodId === period.id ? "primary" : "outline"}
                size="sm"
                onClick={() => setActivePeriodId(period.id)}
              >
                {period.name.replace(" Rajasthan", "")}
              </Button>
            ))}
          </div>
        </div>

        <Card className="overflow-hidden p-0">
          <div className="grid lg:grid-cols-[320px_1fr]">
            <div className="bg-desert-900 p-6 text-white">
              <Badge color="gold">{activePeriod.range}</Badge>
              <h3 className="mt-4 text-2xl font-black">{activePeriod.name}</h3>
              <p className="mt-3 text-sm leading-6 text-desert-100">
                {activePeriod.description}
              </p>
            </div>
            <div className="grid gap-3 p-5 md:grid-cols-2">
              {getPeriodCards(activePeriodId).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="rounded-lg border border-desert-200 bg-desert-50 p-4"
                >
                  <Badge color="blue">{item.badge}</Badge>
                  <h4 className="mt-3 font-black text-desert-900">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-desert-700">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
                Ancient civilizations
              </p>
              <h2 className="mt-2 text-2xl font-black text-desert-900">
                Site map memory board
              </h2>
            </div>
            <Badge color="gold">Click a site</Badge>
          </div>

          <div className="map-grid relative mt-6 h-[360px] overflow-hidden rounded-lg border border-desert-200 bg-desert-50">
            {ancientSites.map((site) => {
              const selected = site.id === selectedSite.id;
              return (
                <button
                  key={site.id}
                  type="button"
                  onClick={() => setSelectedSiteId(site.id)}
                  className={[
                    "absolute -translate-x-1/2 -translate-y-1/2 rounded-lg px-3 py-2 text-xs font-black shadow-soft transition",
                    selected
                      ? "bg-royal-700 text-white ring-4 ring-royal-200"
                      : "bg-white text-desert-900 ring-1 ring-desert-200 hover:ring-royal-300",
                  ].join(" ")}
                  style={{ left: `${site.coordinates.x}%`, top: `${site.coordinates.y}%` }}
                >
                  {site.name}
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Badge color="blue">{selectedSite.period}</Badge>
              <h2 className="mt-3 text-2xl font-black text-desert-900">
                {selectedSite.name}
              </h2>
              <p className="mt-1 text-sm font-bold text-desert-600">
                District: {selectedSite.district}
              </p>
            </div>
            <Button
              variant={siteSaved ? "primary" : "outline"}
              size="sm"
              icon={Bookmark}
              onClick={() =>
                toggleBookmark({
                  id: `history-${selectedSite.id}`,
                  title: selectedSite.name,
                  type: "Ancient site",
                  category: "History",
                  path: "/history",
                })
              }
            >
              {siteSaved ? "Saved" : "Save"}
            </Button>
          </div>
          <p className="mt-4 rounded-lg bg-royal-50 p-4 text-sm font-semibold leading-6 text-royal-900">
            {selectedSite.memoryHook}
          </p>
          <div className="mt-5 grid gap-2">
            {selectedSite.facts.map((fact) => (
              <div key={fact} className="rounded-lg bg-desert-50 px-3 py-2 text-sm font-semibold text-desert-800">
                {fact}
              </div>
            ))}
          </div>
          <Button
            className="mt-5 w-full"
            variant={siteStudied ? "secondary" : "primary"}
            icon={siteStudied ? CheckCircle2 : ScrollText}
            onClick={() => markTopicComplete(selectedSite.id, selectedSite.name, "History")}
          >
            {siteStudied ? "Studied" : "Mark site studied"}
          </Button>
        </Card>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            Medieval Rajasthan
          </p>
          <h2 className="mt-2 text-2xl font-black text-desert-900">
            Kingdom and fort anchors
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {medievalKingdoms.map((kingdom) => (
              <div key={kingdom.id} className="rounded-lg border border-desert-200 bg-white p-4">
                <Badge color="maroon">{kingdom.dynasty}</Badge>
                <h3 className="mt-3 font-black text-desert-900">{kingdom.name}</h3>
                <p className="mt-1 text-sm font-bold text-royal-800">{kingdom.anchor}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {kingdom.facts.map((fact) => (
                    <span key={fact} className="rounded-full bg-desert-50 px-2.5 py-1 text-xs font-bold text-desert-700">
                      {fact}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            Movements
          </p>
          <h2 className="mt-2 text-2xl font-black text-desert-900">
            Cause-effect cards
          </h2>
          <div className="mt-6 space-y-3">
            {movementCards.map((movement) => (
              <div key={movement.id} className="rounded-lg bg-desert-50 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge color="gold">{movement.type}</Badge>
                  <span className="text-xs font-bold uppercase tracking-wide text-desert-600">
                    {movement.place}
                  </span>
                </div>
                <h3 className="mt-3 font-black text-desert-900">{movement.title}</h3>
                <p className="mt-2 text-sm leading-6 text-desert-700">{movement.memoryHook}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            Integration of Rajasthan
          </p>
          <h2 className="mt-2 text-2xl font-black text-desert-900">
            Order the merger story
          </h2>
          <div className="mt-6">
            <Timeline items={integrationTimeline} />
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            History quiz
          </p>
          <h2 className="mt-2 text-2xl font-black text-desert-900">
            Practice site and movement recall
          </h2>
          <div className="mt-5">
            <MCQQuiz
              key="history-quiz"
              questions={historyQuiz}
              quizId="phase-5-history"
              onComplete={recordQuizScore}
            />
          </div>
        </Card>
      </section>
    </div>
  );
}

function getPeriodCards(periodId) {
  if (periodId === "ancient") {
    return ancientSites.map((site) => ({
      id: site.id,
      badge: site.period,
      title: site.name,
      detail: site.memoryHook,
    }));
  }

  if (periodId === "medieval") {
    return medievalKingdoms.map((kingdom) => ({
      id: kingdom.id,
      badge: kingdom.dynasty,
      title: kingdom.name,
      detail: `${kingdom.anchor}. ${kingdom.facts.join(", ")}.`,
    }));
  }

  if (periodId === "integration") {
    return integrationTimeline.map((stage) => ({
      id: stage.id,
      badge: stage.period,
      title: stage.title,
      detail: stage.description,
    }));
  }

  return movementCards.map((movement) => ({
    id: movement.id,
    badge: movement.type,
    title: movement.title,
    detail: movement.memoryHook,
  }));
}
