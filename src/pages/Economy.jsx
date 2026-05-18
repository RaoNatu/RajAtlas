import { useEffect, useMemo, useState } from "react";
import {
  Factory,
  Leaf,
  Pickaxe,
  RotateCcw,
  Route,
  Sun,
  Tractor,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import EconomyLayerMap from "../components/economy/EconomyLayerMap";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import PageHeader from "../components/layout/PageHeader";
import StatsCard from "../components/dashboard/StatsCard";
import {
  animalHusbandryZones,
  economyIndicators,
  economyLayers,
  economyQuiz,
  industryClusters,
  mineralZones,
  powerResources,
  transportCorridors,
} from "../data/economy";
import { useProgress } from "../hooks/useProgress";

const layerIcons = {
  Agriculture: Tractor,
  Minerals: Pickaxe,
  Industries: Factory,
  Power: Sun,
  Transport: Route,
  "Animal Husbandry": Leaf,
};

const chartColors = ["#c59b2c", "#64748b", "#2563eb", "#f59e0b", "#0f766e"];

export default function Economy() {
  const [activeLayer, setActiveLayer] = useState("Agriculture");
  const [selectedItem, setSelectedItem] = useState(economyLayers.Agriculture[0]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [scoreSaved, setScoreSaved] = useState(false);
  const { markTopicComplete, recordQuizScore, setLastOpenedModule } = useProgress();

  useEffect(() => {
    setLastOpenedModule("Economy");
  }, [setLastOpenedModule]);

  const activeItems = economyLayers[activeLayer] || [];
  const currentQuestion = economyQuiz[quizIndex];
  const currentAnswer = quizAnswers.find((answer) => answer.id === currentQuestion.id);
  const quizScore = quizAnswers.filter((answer) => answer.correct).length;
  const mineralChart = useMemo(
    () =>
      mineralZones.map((zone) => ({
        name: zone.name.replace(" Belt", ""),
        districts: zone.districtIds.length,
      })),
    [],
  );

  function chooseLayer(layer) {
    setActiveLayer(layer);
    setSelectedItem(economyLayers[layer][0]);
  }

  function submitAnswer(option) {
    if (currentAnswer) return;
    setSelectedAnswer(option);
    setScoreSaved(false);
    setQuizAnswers((current) => [
      ...current,
      {
        id: currentQuestion.id,
        selected: option,
        correct: option === currentQuestion.answer,
      },
    ]);
  }

  function nextQuestion() {
    setSelectedAnswer("");
    if (quizIndex === economyQuiz.length - 1) {
      if (scoreSaved) return;
      recordQuizScore({
        id: "phase-3-economy-drill",
        category: "Economy",
        score: quizScore,
        total: economyQuiz.length,
      });
      setScoreSaved(true);
      return;
    }
    setQuizIndex((index) => index + 1);
  }

  function restartQuiz() {
    setQuizIndex(0);
    setQuizAnswers([]);
    setSelectedAnswer("");
    setScoreSaved(false);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Economy of Rajasthan"
        description="Study agriculture, minerals, industries, power, transport, and animal husbandry as district-shaped map layers with charts and recall drills."
        badge="Economy"
      />

      <div className="mb-6 rounded-lg border border-royal-100 bg-royal-50 p-4 text-sm leading-6 text-royal-950">
        Learn the economy through place pairs: crops follow soil and rainfall, minerals
        explain industries, power follows desert sun, wind, dams, and fuel, and transport
        connects tourism, border districts, and markets.
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          label="Economy layers"
          value={Object.keys(economyLayers).length}
          helper="Every map layer is rendered through district SVG shapes."
          icon={Factory}
          tone="blue"
        />
        <StatsCard
          label="Mineral clusters"
          value={mineralZones.length}
          helper="Zinc, lead, copper, limestone, marble, salt, and gypsum anchors."
          icon={Pickaxe}
          tone="sand"
        />
        <StatsCard
          label="Power belts"
          value={powerResources.length}
          helper="Solar, wind, thermal, and hydel memory groups."
          icon={Sun}
          tone="green"
        />
        <StatsCard
          label="Transport axes"
          value={transportCorridors.length}
          helper="SVG corridor lines sit on the district map."
          icon={Route}
          tone="maroon"
        />
      </div>

      <section className="mt-8">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
              Economy map layers
            </p>
            <h2 className="mt-2 text-3xl font-black text-desert-900">
              Learn economy by district shape
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.keys(economyLayers).map((layer) => {
              const Icon = layerIcons[layer];
              return (
                <Button
                  key={layer}
                  variant={activeLayer === layer ? "primary" : "outline"}
                  size="sm"
                  icon={Icon}
                  onClick={() => chooseLayer(layer)}
                >
                  {layer}
                </Button>
              );
            })}
          </div>
        </div>

        <EconomyLayerMap
          activeLayer={activeLayer}
          selectedItem={selectedItem}
          onSelectItem={setSelectedItem}
        />

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {activeItems.slice(0, 3).map((item) => (
            <Card key={item.id} className="p-4" interactive>
              <Badge color="blue">{item.category}</Badge>
              <h3 className="mt-3 text-lg font-black text-desert-900">{item.name}</h3>
              <p className="mt-2 text-sm leading-6 text-desert-700">
                {item.memoryHook}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            Economy dashboard
          </p>
          <h2 className="mt-2 text-2xl font-black text-desert-900">
            Sector learning index
          </h2>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={economyIndicators} margin={{ top: 8, right: 12, left: -18, bottom: 36 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#efd5a6" />
                <XAxis
                  dataKey="metric"
                  angle={-16}
                  textAnchor="end"
                  interval={0}
                  tick={{ fill: "#743b1c", fontSize: 12, fontWeight: 700 }}
                />
                <YAxis tick={{ fill: "#743b1c", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {economyIndicators.map((entry, index) => (
                    <Cell key={entry.metric} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            Minerals
          </p>
          <h2 className="mt-2 text-2xl font-black text-desert-900">
            District spread by mineral cluster
          </h2>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mineralChart}
                  dataKey="districts"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {mineralChart.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <section className="mt-12 grid gap-6 xl:grid-cols-3">
        <EconomyList
          title="Industries"
          items={industryClusters}
          renderMeta={(item) => item.industries.join(", ")}
          onMark={() => markTopicComplete("economy-industries", "Economy industries")}
        />
        <EconomyList
          title="Power resources"
          items={powerResources}
          renderMeta={(item) => item.sources.join(", ")}
          onMark={() => markTopicComplete("economy-power", "Economy power resources")}
        />
        <EconomyList
          title="Animal husbandry"
          items={animalHusbandryZones}
          renderMeta={(item) => item.species.join(", ")}
          onMark={() => markTopicComplete("economy-animal-husbandry", "Economy animal husbandry")}
        />
      </section>

      <section className="mt-12">
        <Card className="p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Badge color="gold">Economy Drill</Badge>
              <h2 className="mt-4 text-2xl font-black text-desert-900">
                {currentQuestion.question}
              </h2>
            </div>
            <Badge color="blue">
              {quizIndex + 1} / {economyQuiz.length}
            </Badge>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option || currentAnswer?.selected === option;
              const isCorrect = currentAnswer && option === currentQuestion.answer;
              const isWrong = currentAnswer && isSelected && option !== currentQuestion.answer;

              return (
                <button
                  key={option}
                  type="button"
                  disabled={Boolean(currentAnswer)}
                  onClick={() => submitAnswer(option)}
                  className={[
                    "min-h-12 rounded-lg border px-4 py-3 text-left text-sm font-bold transition",
                    isCorrect
                      ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                      : isWrong
                        ? "border-maroon-300 bg-maroon-50 text-maroon-900"
                        : isSelected
                          ? "border-royal-300 bg-royal-50 text-royal-900"
                          : "border-desert-200 bg-white text-desert-900 hover:border-royal-200",
                  ].join(" ")}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {currentAnswer ? (
            <div className="mt-6 flex flex-col gap-3 rounded-lg bg-desert-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-black text-desert-900">
                Score so far: {quizScore} / {quizAnswers.length}
              </p>
              <div className="flex gap-2">
                <Button variant="secondary" icon={RotateCcw} onClick={restartQuiz}>
                  Restart
                </Button>
                <Button onClick={nextQuestion}>
                  {quizIndex === economyQuiz.length - 1
                    ? scoreSaved
                      ? "Saved"
                      : "Save score"
                    : "Next"}
                </Button>
              </div>
            </div>
          ) : null}
        </Card>
      </section>
    </div>
  );
}

function EconomyList({ title, items, renderMeta, onMark }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            Economy drill
          </p>
          <h2 className="mt-2 text-2xl font-black text-desert-900">{title}</h2>
        </div>
        <Button variant="secondary" size="sm" onClick={onMark}>
          Studied
        </Button>
      </div>
      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-lg bg-desert-50 p-4">
            <h3 className="font-black text-desert-900">{item.name}</h3>
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-desert-600">
              {renderMeta(item)}
            </p>
            <p className="mt-2 text-sm leading-6 text-desert-700">
              {item.memoryHook}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
