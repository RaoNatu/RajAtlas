import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bookmark,
  Building2,
  CheckCircle2,
  Landmark,
  Network,
  Scale,
  Users,
} from "lucide-react";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import PageHeader from "../components/layout/PageHeader";
import StatsCard from "../components/dashboard/StatsCard";
import Timeline from "../components/learning/Timeline";
import MCQQuiz from "../components/quiz/MCQQuiz";
import {
  currentPoliticalSnapshot,
  governanceCards,
  highCourtFacts,
  leadersTimeline,
  localGovernance,
  politicalFirstCards,
  politicalStructure,
  politicsQuiz,
} from "../data/politics";
import { useProgress } from "../hooks/useProgress";

export default function Politics() {
  const [activeRoleId, setActiveRoleId] = useState(governanceCards[0].id);
  const {
    markTopicComplete,
    recordQuizScore,
    setLastOpenedModule,
    toggleBookmark,
    isBookmarked,
    progress,
  } = useProgress();

  useEffect(() => {
    setLastOpenedModule("Politics");
  }, [setLastOpenedModule]);

  const activeRole = useMemo(
    () => governanceCards.find((role) => role.id === activeRoleId) || governanceCards[0],
    [activeRoleId],
  );
  const completed = progress.completedTopics.includes(activeRole.id);
  const bookmarked = isBookmarked(`politics-${activeRole.id}`);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Rajasthan polity"
        title="Politics and Administration"
        description="Learn Rajasthan polity through role cards, appointment-power flow, High Court anchors, local governance tiers, and quick recall quizzes."
        badge="Polity"
      />

      <div className="mb-6 rounded-lg border border-royal-100 bg-royal-50 p-4 text-sm leading-6 text-royal-950">
        Read polity from top to bottom: Governor is the constitutional head, the Chief
        Minister leads the elected executive, the Assembly makes laws and controls the
        government, courts protect rights, and local bodies handle village and city work.
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          label="Governance cards"
          value={governanceCards.length}
          helper="Governor, Chief Minister, Assembly, High Court."
          icon={Landmark}
          tone="blue"
        />
        <StatsCard
          label="Structure nodes"
          value={politicalStructure.length}
          helper="Flowchart-ready polity concepts."
          icon={Network}
          tone="green"
        />
        <StatsCard
          label="Local tiers"
          value={localGovernance.length}
          helper="Rural and urban governance separated."
          icon={Users}
          tone="sand"
        />
        <StatsCard
          label="Quiz cards"
          value={politicsQuiz.length}
          helper="Appointment, assembly, and court facts."
          icon={Scale}
          tone="maroon"
        />
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
                Political structure
              </p>
              <h2 className="mt-2 text-2xl font-black text-desert-900">
                Appointment and accountability flow
              </h2>
            </div>
            <Badge color="gold">Flowchart</Badge>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {politicalStructure.map((node, index) => (
              <motion.button
                key={node.id}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                onClick={() => {
                  const matchingRole = governanceCards.find((role) =>
                    role.category.toLowerCase().includes(node.title.toLowerCase().split(" ")[0]),
                  );
                  if (matchingRole) setActiveRoleId(matchingRole.id);
                }}
                className="rounded-lg border border-desert-200 bg-desert-50 p-4 text-left transition hover:border-royal-300 hover:bg-royal-50"
              >
                <Badge color="blue">{node.layer}</Badge>
                <h3 className="mt-3 text-lg font-black text-desert-900">{node.title}</h3>
                <p className="mt-2 text-sm leading-6 text-desert-700">{node.memoryHook}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {node.connectsTo.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-desert-700 ring-1 ring-desert-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.button>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Badge color="maroon">{activeRole.category}</Badge>
              <h2 className="mt-3 text-2xl font-black text-desert-900">
                {activeRole.title}
              </h2>
            </div>
            <Button
              variant={bookmarked ? "primary" : "outline"}
              size="sm"
              icon={Bookmark}
              onClick={() =>
                toggleBookmark({
                  id: `politics-${activeRole.id}`,
                  title: activeRole.title,
                  type: "Politics role",
                  category: activeRole.category,
                  path: "/politics",
                })
              }
            >
              {bookmarked ? "Saved" : "Save"}
            </Button>
          </div>

          <div className="mt-5 space-y-4">
            <InfoBlock label="Appointment" value={activeRole.appointment} />
            <InfoBlock label="Tenure" value={activeRole.tenure} />
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
                Powers
              </p>
              <div className="mt-2 grid gap-2">
                {activeRole.powers.map((power) => (
                  <div key={power} className="rounded-lg bg-desert-50 px-3 py-2 text-sm font-semibold text-desert-800">
                    {power}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-royal-50 p-4">
              <p className="text-sm font-bold text-royal-900">Important facts</p>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-royal-900">
                {activeRole.importantFacts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </div>
          </div>

          <Button
            className="mt-5 w-full"
            variant={completed ? "secondary" : "primary"}
            icon={completed ? CheckCircle2 : Landmark}
            onClick={() => markTopicComplete(activeRole.id, activeRole.title, "Politics")}
          >
            {completed ? "Studied" : "Mark role studied"}
          </Button>
        </Card>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            Current snapshot
          </p>
          <h2 className="mt-2 text-2xl font-black text-desert-900">
            Offices to revise before exams
          </h2>
          <div className="mt-5 space-y-3">
            {currentPoliticalSnapshot.map((item) => (
              <div key={item.label} className="rounded-lg bg-desert-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-desert-600">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-black text-desert-900">{item.value}</p>
                <p className="mt-1 text-sm leading-6 text-desert-700">{item.note}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            First political things
          </p>
          <h2 className="mt-2 text-2xl font-black text-desert-900">
            Firsts, first women, and milestones
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {politicalFirstCards.map((item) => (
              <div key={item.id} className="rounded-lg border border-desert-200 bg-white p-4">
                <Badge color="gold">{item.category}</Badge>
                <h3 className="mt-3 font-black text-desert-900">{item.title}</h3>
                <p className="mt-1 text-lg font-black text-royal-800">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-desert-700">{item.memoryHook}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-royal-700" aria-hidden="true" />
            <h2 className="text-2xl font-black text-desert-900">High Court anchors</h2>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {highCourtFacts.map((fact) => (
              <div key={fact.label} className="rounded-lg bg-desert-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-desert-600">
                  {fact.label}
                </p>
                <p className="mt-2 text-lg font-black text-desert-900">{fact.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-royal-700" aria-hidden="true" />
            <h2 className="text-2xl font-black text-desert-900">Local governance ladder</h2>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {localGovernance.map((tier) => (
              <div key={tier.id} className="rounded-lg border border-desert-200 bg-white p-4">
                <Badge color={tier.level === "Urban" ? "maroon" : "green"}>{tier.level}</Badge>
                <h3 className="mt-3 font-black text-desert-900">{tier.title}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-desert-600">
                  {tier.type}
                </p>
                <p className="mt-2 text-sm leading-6 text-desert-700">{tier.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            Leaders and milestones
          </p>
          <h2 className="mt-2 text-2xl font-black text-desert-900">
            Timeline-ready polity cards
          </h2>
          <div className="mt-6">
            <Timeline items={leadersTimeline} />
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            Appointment-power quiz
          </p>
          <h2 className="mt-2 text-2xl font-black text-desert-900">
            Practice polity recall
          </h2>
          <div className="mt-5">
            <MCQQuiz
              key="politics-quiz"
              questions={politicsQuiz}
              quizId="phase-4-politics"
              onComplete={recordQuizScore}
            />
          </div>
        </Card>
      </section>
    </div>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-wide text-royal-800">{label}</p>
      <p className="mt-2 rounded-lg bg-desert-50 p-3 text-sm font-semibold leading-6 text-desert-800">
        {value}
      </p>
    </div>
  );
}
