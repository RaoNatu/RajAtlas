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
  UserRound,
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
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useProgress } from "../hooks/useProgress";
import hawaMahal from "../assets/photos/hawa-mahal.jpg";
import mehrangarhFort from "../assets/photos/mehrangarh-fort.jpg";

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
  const { user } = useAuth();
  const { t } = useLanguage();
  const { progress, completionPercentage, markTopicComplete } = useProgress();
  const challengeDone = progress.completedTopics?.includes("daily-district-challenge");

  return (
    <div>
      <section className="relative min-h-[72vh] overflow-hidden bg-desert-900">
        <img
          src={hawaMahal}
          alt="Hawa Mahal in Jaipur"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/64 to-black/38" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="relative mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-end px-4 pb-10 pt-20 text-white sm:px-6 lg:px-8 lg:pb-14 lg:pt-28">
          <div className="hero-readable max-w-3xl">
            <Badge color="gold">{t("heroBadge")}</Badge>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-desert-50 sm:text-lg">
              {t("heroCopy")}
            </p>
            <div className="mt-8 grid w-[calc(100vw-3rem)] max-w-xl gap-3 sm:flex sm:w-auto sm:flex-wrap">
              <Button
                className="w-full sm:w-auto"
                icon={Compass}
                onClick={() => navigate("/map")}
              >
                {t("exploreMap")}
              </Button>
              <Button
                className="w-full sm:w-auto"
                variant="secondary"
                icon={Brain}
                onClick={() => navigate("/quiz")}
              >
                {t("startQuiz")}
              </Button>
              <Button
                className="w-full sm:w-auto"
                variant="outline"
                icon={Trophy}
                onClick={() => navigate("/progress")}
              >
                {t("viewProgress")}
              </Button>
              <Button
                className="w-full sm:w-auto"
                variant="outline"
                icon={BookOpen}
                onClick={() => navigate("/learn")}
              >
                {t("revisionLab")}
              </Button>
              <Button
                className="w-full sm:w-auto"
                variant="secondary"
                icon={UserRound}
                onClick={() => navigate(user ? "/dashboard" : "/register")}
              >
                {user ? t("dashboard") : t("createAccount")}
              </Button>
            </div>
          </div>

          <div className="mt-10 grid w-[calc(100vw-3rem)] max-w-full gap-4 sm:w-full sm:grid-cols-3">
            <HeroStat label={t("currentDistricts")} value={currentDistrictIds.length} />
            <HeroStat label={t("regionsCount")} value={regions.length} />
            <HeroStat label={t("learningCards")} value={introFacts.length + districts.length} />
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
            helper="Feeds the progress and revision dashboards."
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
            Move from map memory to facts, then reinforce weak areas with quizzes and flashcards.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {modules.map((module) => (
            <TopicCard key={module.title} {...module} />
          ))}
        </div>

        <section className="mt-12 overflow-hidden rounded-lg border border-desert-200 bg-white shadow-soft">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <img
              src={mehrangarhFort}
              alt="Mehrangarh Fort in Jodhpur"
              className="h-full min-h-[320px] w-full object-cover"
            />
            <div className="p-6 sm:p-8 lg:p-10">
              <Badge color="maroon">Built for recall</Badge>
              <h2 className="mt-4 text-3xl font-black text-desert-900">
                Study Rajasthan as places, not paragraphs
              </h2>
              <p className="mt-4 text-sm leading-7 text-desert-700 sm:text-base">
                RajAtlas connects forts, rivers, districts, polity roles, economy
                anchors, and culture clues to a map-first learning flow. The result
                feels closer to a study desk than a static notes page.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {["Map anchors", "Fast drills", "Account controls"].map((item) => (
                  <div key={item} className="rounded-lg bg-desert-50 p-4">
                    <p className="font-black text-desert-900">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

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
