import { useEffect, useMemo, useState } from "react";
import { BookOpen, MapPinned } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import SearchBar from "../components/common/SearchBar";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import EmptyState from "../components/common/EmptyState";
import DistrictInfoPanel from "../components/map/DistrictInfoPanel";
import MapControls from "../components/map/MapControls";
import MapLegend from "../components/map/MapLegend";
import RajasthanMap from "../components/map/RajasthanMap";
import FactCard from "../components/learning/FactCard";
import { annulled2024DistrictIds, currentDistrictIds, districts } from "../data/districts";
import { factCategories, introFacts } from "../data/introFacts";
import { regions } from "../data/regions";
import { useProgress } from "../hooks/useProgress";
import { buildMapSearchResults } from "../utils/mapHelpers";

export default function MapExplorer() {
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
  const [query, setQuery] = useState("");
  const [activeLayer, setActiveLayer] = useState("Districts");
  const [selectedRegionId, setSelectedRegionId] = useState("");
  const [factCategory, setFactCategory] = useState("All");
  const {
    progress,
    markTopicComplete,
    setLastOpenedModule,
  } = useProgress();

  useEffect(() => {
    setLastOpenedModule("Map Explorer");
  }, [setLastOpenedModule]);

  const selectedRegion = regions.find((region) => region.id === selectedRegionId);
  const visibleDistricts = useMemo(() => buildMapSearchResults(query), [query]);
  const filteredFacts = useMemo(() => {
    if (factCategory === "All") return introFacts;
    return introFacts.filter((fact) => fact.category === factCategory);
  }, [factCategory]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Interactive Rajasthan District Map"
        description="Click districts, search by name, highlight regions, and turn basic Rajasthan Introduction facts into studied topics."
        badge="Phase 1"
        actions={
          <Button
            variant="secondary"
            icon={MapPinned}
            onClick={() => {
              setQuery("");
              setSelectedRegionId("");
              setSelectedDistrict(districts[0]);
            }}
          >
            Reset explorer
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <Card className="p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge color="green">{currentDistrictIds.length} current districts</Badge>
              <Badge color="maroon">{annulled2024DistrictIds.length} annulled 2024-25 labels kept for map practice</Badge>
            </div>
            <div className="grid gap-3 lg:grid-cols-[1fr_220px]">
              <SearchBar
                value={query}
                onChange={setQuery}
                placeholder="Search district, region, division, nickname"
              />
              <select
                value={selectedRegionId}
                onChange={(event) => setSelectedRegionId(event.target.value)}
                className="h-11 rounded-lg border border-desert-200 bg-white px-3 text-sm font-semibold text-desert-900 outline-none focus:border-royal-400 focus:ring-4 focus:ring-royal-100"
              >
                <option value="">All regions</option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>
          </Card>

          <MapControls
            activeLayer={activeLayer}
            selectedRegion={selectedRegion}
            onLayerChange={setActiveLayer}
            onReset={() => {
              setQuery("");
              setSelectedRegionId("");
            }}
          />

          <RajasthanMap
            selectedDistrictId={selectedDistrict?.id}
            selectedRegion={selectedRegion}
            visibleDistricts={visibleDistricts}
            onSelectDistrict={setSelectedDistrict}
          />
          <MapLegend selectedRegion={selectedRegion} />

          {query && !visibleDistricts.length ? (
            <EmptyState
              title="No district found"
              description="Try another spelling or add the missing district in src/data/districts.js."
            />
          ) : null}
        </div>

        <DistrictInfoPanel
          district={selectedDistrict}
          onMarkStudied={markTopicComplete}
        />
      </div>

      <section className="mt-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-royal-700" aria-hidden="true" />
              <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
                Rajasthan Introduction cards
              </p>
            </div>
            <h2 className="mt-2 text-3xl font-black text-desert-900">
              Learn the first facts in small pieces
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {factCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFactCategory(category)}
                className={[
                  "whitespace-nowrap rounded-full px-3 py-2 text-sm font-bold transition",
                  factCategory === category
                    ? "bg-royal-700 text-white"
                    : "bg-white text-desert-800 ring-1 ring-desert-200 hover:text-royal-800",
                ].join(" ")}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredFacts.map((fact) => (
            <FactCard
              key={fact.id}
              fact={fact}
              completed={progress.completedTopics?.includes(fact.id)}
              onComplete={markTopicComplete}
            />
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Badge color="gold">Tip</Badge>
          <p className="text-sm leading-6 text-desert-700">
            Exact book facts can be added without touching UI code. Update the data
            files and the cards, filters, map, quiz, and progress views will refresh.
          </p>
        </div>
      </section>
    </div>
  );
}
