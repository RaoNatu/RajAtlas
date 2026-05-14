import {
  BookOpen,
  Brain,
  Compass,
  Landmark,
  Map,
  Palette,
  PieChart,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import DailyChallenge from "../components/dashboard/DailyChallenge";
import ProgressTracker from "../components/dashboard/ProgressTracker";
import StatsCard from "../components/dashboard/StatsCard";
import TopicCard from "../components/learning/TopicCard";
import { currentDistrictIds, districts } from "../data/districts";
import { introFacts } from "../data/introFacts";
import { regions } from "../data/regions";
import { useProgress } from "../hooks/useProgress";

const modules = [
  {
    title: "Geography",
    description: "Maps, rivers, soils, climate, forests, wildlife, lakes, and census visuals.",
    to: "/geography",
    icon: Map,
    status: "Live",
    color: "gold",
  },
  {
    title: "History",
    description: "Timelines, kingdoms, movements, leaders, and Rajasthan integration.",
    to: "/history",
    icon: Landmark,
    status: "Live",
    color: "sand",
  },
  {
    title: "Politics",
    description: "Governor, CM, assembly, judiciary, administration, and local governance.",
    to: "/politics",
    icon: ShieldCheck,
    status: "Live",
    color: "blue",
  },
  {
    title: "Economy",
    description: "Agriculture, minerals, industries, power, transport, and dashboards.",
    to: "/economy",
    icon: PieChart,
    status: "Live",
    color: "green",
  },
  {
    title: "Culture",
    description: "Forts, temples, fairs, dances, music, paintings, and handicrafts.",
    to: "/culture",
    icon: Palette,
    status: "Live",
    color: "maroon",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { progress, completionPercentage, markTopicComplete } = useProgress();
  const challengeDone = progress.completedTopics?.includes("daily-district-challenge");

  return (
    <div>
      <section className="atlas-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[linear-gradient(135deg,transparent_0%,rgba(255,248,236,0.14)_45%,transparent_46%),repeating-linear-gradient(90deg,rgba(255,248,236,0.16)_0,rgba(255,248,236,0.16)_1px,transparent_1px,transparent_36px)]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl">
            <Badge color="gold">Phases 1-7 local build</Badge>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              RajAtlas
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-desert-50 sm:text-lg">
              Learn Rajasthan GK visually through interactive maps, region
              clusters, quiz repetition, learning cards, and progress tracking
              designed for memory.
            </p>
            <div className="mt-8 grid w-[calc(100vw-3rem)] max-w-xl gap-3 sm:flex sm:w-auto sm:flex-wrap">
              <Button
                className="w-full sm:w-auto"
                icon={Compass}
                onClick={() => navigate("/map")}
              >
                Explore Map
              </Button>
              <Button
                className="w-full sm:w-auto"
                variant="secondary"
                icon={Brain}
                onClick={() => navigate("/quiz")}
              >
                Start Quiz
              </Button>
              <Button
                className="w-full sm:w-auto"
                variant="outline"
                icon={Trophy}
                onClick={() => navigate("/progress")}
              >
                View Progress
              </Button>
              <Button
                className="w-full sm:w-auto"
                variant="outline"
                icon={BookOpen}
                onClick={() => navigate("/learn")}
              >
                Revision Lab
              </Button>
            </div>
          </div>

          <div className="mt-10 grid w-[calc(100vw-3rem)] max-w-full gap-4 sm:w-full sm:grid-cols-3">
            <HeroStat label="Current districts" value={currentDistrictIds.length} />
            <HeroStat label="Regions" value={regions.length} />
            <HeroStat label="Learning cards" value={introFacts.length + districts.length} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <ProgressTracker
            progress={progress}
            completionPercentage={completionPercentage}
          />
          <DailyChallenge
            completed={challengeDone}
            onComplete={() =>
              markTopicComplete("daily-district-challenge", "Daily district challenge")
            }
          />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            label="Current module"
            value="RajAtlas"
            helper="Introduction through culture, plus revision lab."
            icon={BookOpen}
            tone="sand"
          />
          <StatsCard
            label="Completion"
            value={`${completionPercentage}%`}
            helper="Based on studied topics across modules."
            icon={Trophy}
            tone="blue"
          />
          <StatsCard
            label="Quiz attempts"
            value={progress.quizScores?.length || 0}
            helper="Saved locally in this browser."
            icon={Brain}
            tone="green"
          />
          <StatsCard
            label="Last opened"
            value={progress.lastOpenedModule || "Introduction"}
            helper="Helps resume the learning path."
            icon={Compass}
            tone="maroon"
          />
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
              Book roadmap
            </p>
            <h2 className="mt-2 text-3xl font-black text-desert-900">
              Main learning modules
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-desert-700">
            Modules now use data-first pages so the project can keep growing chapter by chapter.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {modules.map((module) => (
            <TopicCard key={module.title} {...module} />
          ))}
        </div>

        <Card className="mt-10 overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-desert-900 p-6 text-white sm:p-8">
              <Badge color="gold">Learning loop</Badge>
              <h2 className="mt-4 text-2xl font-black">How RajAtlas teaches</h2>
              <p className="mt-3 text-sm leading-7 text-desert-50">
                Explore a district, group it by region, answer a quiz question, then
                mark the fact as studied. The same loop now supports rivers,
                forts, leaders, economy charts, culture galleries, and revision.
              </p>
            </div>
            <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8">
              {["Map first", "Card recall", "Quiz repeat"].map((item, index) => (
                <div key={item} className="rounded-lg bg-desert-50 p-4">
                  <span className="text-sm font-black text-royal-800">
                    0{index + 1}
                  </span>
                  <p className="mt-2 font-black text-desert-900">{item}</p>
                  <p className="mt-2 text-sm leading-6 text-desert-700">
                    {index === 0
                      ? "See districts and regions spatially."
                      : index === 1
                        ? "Turn facts into short memory prompts."
                        : "Reinforce weak areas with scores."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

function HeroStat({ label, value }) {
  return (
    <div className="rounded-lg border border-white/18 bg-white/12 px-4 py-3 backdrop-blur">
      <p className="text-2xl font-black">{value}</p>
      <p className="text-sm font-semibold text-desert-50">{label}</p>
    </div>
  );
}
