import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Droplets,
  Leaf,
  Map,
  Mountain,
  RotateCcw,
  Waves,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import GeographyLayerMap from "../components/geography/GeographyLayerMap";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import PageHeader from "../components/layout/PageHeader";
import StatsCard from "../components/dashboard/StatsCard";
import { climateZones, rainfallComparison } from "../data/climate";
import {
  census2011,
  geographyQuiz,
  hillsAndMountains,
  irrigationProjects,
  physicalFeatures,
  tribes,
  wildlifeAreas,
} from "../data/geography";
import { lakes } from "../data/lakes";
import { rivers } from "../data/rivers";
import { soils } from "../data/soil";
import { useProgress } from "../hooks/useProgress";

const layers = ["Rivers", "Lakes", "Soil", "Climate", "Wildlife", "Irrigation"];

const layerIcons = {
  Rivers: Waves,
  Lakes: Droplets,
  Soil: Mountain,
  Climate: Map,
  Wildlife: Leaf,
  Irrigation: Waves,
};

const chartColors = ["#1c5fc4", "#bf7327", "#0f766e", "#9f1736", "#7c3aed"];

export default function Geography() {
  const [activeLayer, setActiveLayer] = useState("Rivers");
  const [selectedItem, setSelectedItem] = useState(rivers[0]);
  const [lakeFilter, setLakeFilter] = useState("All");
  const [drillIndex, setDrillIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [drillAnswers, setDrillAnswers] = useState([]);
  const [drillSaved, setDrillSaved] = useState(false);
  const { markTopicComplete, recordQuizScore, setLastOpenedModule } = useProgress();

  useEffect(() => {
    setLastOpenedModule("Geography");
  }, [setLastOpenedModule]);

  const activeItems = useMemo(() => getLayerItems(activeLayer), [activeLayer]);
  const filteredLakes = useMemo(() => {
    if (lakeFilter === "All") return lakes;
    return lakes.filter((lake) => lake.type === lakeFilter || lake.nature === lakeFilter);
  }, [lakeFilter]);
  const currentQuestion = geographyQuiz[drillIndex];
  const currentAnswer = drillAnswers.find((answer) => answer.id === currentQuestion?.id);
  const drillScore = drillAnswers.filter((answer) => answer.correct).length;

  function chooseLayer(layer) {
    const items = getLayerItems(layer);
    setActiveLayer(layer);
    setSelectedItem(items[0]);
  }

  function submitDrillAnswer(option) {
    if (currentAnswer) return;
    setSelectedAnswer(option);
    setDrillSaved(false);
    const correct = option === currentQuestion.answer;
    setDrillAnswers((current) => [
      ...current,
      { id: currentQuestion.id, selected: option, correct },
    ]);
  }

  function nextDrillQuestion() {
    setSelectedAnswer("");
    if (drillIndex === geographyQuiz.length - 1) {
      if (drillSaved) return;
      recordQuizScore({
        id: "phase-2-geography-drill",
        category: "Geography",
        score: drillScore,
        total: geographyQuiz.length,
      });
      setDrillSaved(true);
      return;
    }
    setDrillIndex((index) => index + 1);
  }

  function restartDrill() {
    setDrillIndex(0);
    setSelectedAnswer("");
    setDrillAnswers([]);
    setDrillSaved(false);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Geography of Rajasthan"
        description="Phase 2 turns physical features, rivers, lakes, soil, climate, wildlife, irrigation, tribes, and Census 2011 into map layers, visual cards, charts, and recall drills."
        badge="Phase 2"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          label="Map layers"
          value={layers.length}
          helper="Rivers, lakes, soil, climate, wildlife, irrigation."
          icon={Map}
          tone="blue"
        />
        <StatsCard
          label="River systems"
          value={rivers.length}
          helper="Clickable river paths with origins and memory hooks."
          icon={Waves}
          tone="green"
        />
        <StatsCard
          label="Lakes"
          value={lakes.length}
          helper="Natural, artificial, saltwater, and freshwater filters."
          icon={Droplets}
          tone="sand"
        />
        <StatsCard
          label="Census metrics"
          value={census2011.length}
          helper="Rajasthan compared with India from Census 2011."
          icon={BookOpen}
          tone="maroon"
        />
      </div>

      <section className="mt-8">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
              Geography map layers
            </p>
            <h2 className="mt-2 text-3xl font-black text-desert-900">
              Explore one layer at a time
            </h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {layers.map((layer) => {
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

        <GeographyLayerMap
          activeLayer={activeLayer}
          selectedItem={selectedItem}
          onSelectItem={setSelectedItem}
        />

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {activeItems.slice(0, 3).map((item) => (
            <Card key={item.id} className="p-4" interactive>
              <Badge color="blue">{activeLayer}</Badge>
              <h3 className="mt-3 text-lg font-black text-desert-900">
                {item.name || item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-desert-700">
                {item.memoryHook || item.note || item.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            Physical features
          </p>
          <h2 className="mt-2 text-2xl font-black text-desert-900">
            Relief and landscape anchors
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {physicalFeatures.map((feature) => (
              <div key={feature.id} className="rounded-lg bg-desert-50 p-4">
                <Badge color="gold">{feature.region}</Badge>
                <h3 className="mt-3 font-black text-desert-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-desert-700">
                  {feature.description}
                </p>
                <p className="mt-3 text-sm font-bold text-royal-800">
                  {feature.memoryHook}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            Climate visualization
          </p>
          <h2 className="mt-2 text-2xl font-black text-desert-900">
            Rainfall zone comparison
          </h2>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rainfallComparison} margin={{ top: 8, right: 12, left: -18, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#efd5a6" />
                <XAxis dataKey="zone" tick={{ fill: "#743b1c", fontSize: 12, fontWeight: 700 }} />
                <YAxis tick={{ fill: "#743b1c", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="rainfall" name="Relative rainfall index" radius={[8, 8, 0, 0]}>
                  {rainfallComparison.map((entry, index) => (
                    <Cell key={entry.zone} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <section className="mt-12">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
              Hills and mountains
            </p>
            <h2 className="mt-2 text-3xl font-black text-desert-900">
              Aravalli and Hadoti height memory
            </h2>
          </div>
          <Badge color="green">{hillsAndMountains.length} anchors</Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {hillsAndMountains.map((hill) => (
            <Card key={hill.id} className="p-5" interactive>
              <div className="flex flex-wrap gap-2">
                <Badge color="blue">{hill.range}</Badge>
                <Badge color="sand">{hill.district}</Badge>
              </div>
              <h3 className="mt-4 text-lg font-black text-desert-900">{hill.name}</h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-desert-600">
                {hill.elevation}
              </p>
              <p className="mt-3 text-sm leading-6 text-desert-700">
                {hill.memoryHook}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
              Lakes module
            </p>
            <h2 className="mt-2 text-3xl font-black text-desert-900">
              Natural, artificial, saltwater, freshwater
            </h2>
          </div>
          <select
            value={lakeFilter}
            onChange={(event) => setLakeFilter(event.target.value)}
            className="h-11 rounded-lg border border-desert-200 bg-white px-3 text-sm font-semibold text-desert-900 outline-none focus:border-royal-400 focus:ring-4 focus:ring-royal-100"
          >
            {["All", "Natural", "Artificial", "Saltwater", "Freshwater"].map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {filteredLakes.map((lake) => (
            <Card key={lake.id} className="p-5" interactive>
              <div className="flex flex-wrap gap-2">
                <Badge color={lake.type === "Saltwater" ? "gold" : "blue"}>
                  {lake.type}
                </Badge>
                <Badge color="sand">{lake.nature}</Badge>
              </div>
              <h3 className="mt-4 text-lg font-black text-desert-900">{lake.name}</h3>
              <p className="mt-2 text-sm font-semibold text-desert-700">{lake.district}</p>
              <p className="mt-3 text-sm leading-6 text-desert-700">{lake.memoryHook}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 xl:grid-cols-3">
        <TopicList
          title="Soil and crops"
          eyebrow="Soil module"
          items={soils}
          renderMeta={(soil) => soil.cropSuitability.join(", ")}
          onMark={() => markTopicComplete("geography-soil", "Geography soil module")}
        />
        <TopicList
          title="Wildlife and forest"
          eyebrow="Conservation"
          items={wildlifeAreas}
          renderMeta={(area) => `${area.district} | ${area.type}`}
          onMark={() => markTopicComplete("geography-wildlife", "Geography wildlife module")}
        />
        <TopicList
          title="Irrigation"
          eyebrow="Water resources"
          items={irrigationProjects}
          renderMeta={(project) => project.linkedDistricts.join(", ")}
          onMark={() => markTopicComplete("geography-irrigation", "Geography irrigation module")}
        />
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            Tribes
          </p>
          <h2 className="mt-2 text-2xl font-black text-desert-900">
            Region-to-community recall
          </h2>
          <div className="mt-6 space-y-3">
            {tribes.map((tribe) => (
              <div key={tribe.id} className="rounded-lg bg-desert-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-black text-desert-900">{tribe.name}</h3>
                  <Badge color="blue">{tribe.region}</Badge>
                </div>
                <p className="mt-2 text-sm leading-6 text-desert-700">
                  {tribe.districts.join(", ")}
                </p>
                <p className="mt-2 text-sm font-bold text-royal-800">
                  {tribe.memoryHook}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            Population Census 2011
          </p>
          <h2 className="mt-2 text-2xl font-black text-desert-900">
            Rajasthan vs India
          </h2>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={census2011} margin={{ top: 8, right: 12, left: -18, bottom: 42 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#efd5a6" />
                <XAxis
                  dataKey="metric"
                  angle={-18}
                  textAnchor="end"
                  interval={0}
                  tick={{ fill: "#743b1c", fontSize: 12, fontWeight: 700 }}
                />
                <YAxis tick={{ fill: "#743b1c", fontSize: 12 }} />
                <Tooltip content={<CensusTooltip />} />
                <Legend />
                <Bar dataKey="rajasthan" name="Rajasthan" fill="#1c5fc4" radius={[8, 8, 0, 0]} />
                <Bar dataKey="india" name="India" fill="#bf7327" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <section className="mt-12">
        <Card className="p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Badge color="gold">Quick Geography Drill</Badge>
              <h2 className="mt-4 text-2xl font-black text-desert-900">
                {currentQuestion.question}
              </h2>
            </div>
            <Badge color="blue">
              {drillIndex + 1} / {geographyQuiz.length}
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
                  onClick={() => submitDrillAnswer(option)}
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
              <div className="flex items-center gap-2 font-black text-desert-900">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                Score so far: {drillScore} / {drillAnswers.length}
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" icon={RotateCcw} onClick={restartDrill}>
                  Restart
                </Button>
                <Button onClick={nextDrillQuestion}>
                  {drillIndex === geographyQuiz.length - 1
                    ? drillSaved
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

function TopicList({ title, eyebrow, items, renderMeta, onMark }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            {eyebrow}
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
              {item.memoryHook || item.note}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function CensusTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const unit = payload[0]?.payload?.unit;

  return (
    <div className="rounded-lg border border-desert-200 bg-white p-3 text-sm shadow-soft">
      <p className="font-black text-desert-900">{label}</p>
      {payload.map((item) => (
        <p key={item.dataKey} className="mt-1 font-semibold" style={{ color: item.fill }}>
          {item.name}: {item.value} {unit}
        </p>
      ))}
    </div>
  );
}

function getLayerItems(activeLayer) {
  if (activeLayer === "Rivers") return rivers;
  if (activeLayer === "Lakes") return lakes;
  if (activeLayer === "Soil") return soils;
  if (activeLayer === "Climate") return climateZones;
  if (activeLayer === "Wildlife") return wildlifeAreas;
  if (activeLayer === "Irrigation") return irrigationProjects;
  return rivers;
}
