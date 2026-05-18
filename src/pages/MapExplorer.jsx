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
import { climateZones } from "../data/climate";
import { annulled2024DistrictIds, currentDistrictIds, districts } from "../data/districts";
import { factCategories, introFacts } from "../data/introFacts";
import { regions } from "../data/regions";
import { rivers } from "../data/rivers";
import { soils } from "../data/soil";
import { useProgress } from "../hooks/useProgress";
import { buildMapSearchResults } from "../utils/mapHelpers";

const layerOrder = ["Districts", "Regions", "Divisions", "Rivers", "Soil", "Climate"];
const divisionColors = {
  Ajmer: "#f59e0b",
  Bharatpur: "#14b8a6",
  Bikaner: "#ef4444",
  Jaipur: "#2563eb",
  Jodhpur: "#a855f7",
  Kota: "#16a34a",
  Udaipur: "#db2777",
};

export default function MapExplorer() {
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
  const [query, setQuery] = useState("");
  const [activeLayer, setActiveLayer] = useState("Districts");
  const [selectedRegionId, setSelectedRegionId] = useState("");
  const [factCategory, setFactCategory] = useState("All");
  const [mapFocus, setMapFocus] = useState(false);
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
  const layerView = useMemo(
    () => buildLayerView(activeLayer, selectedRegion),
    [activeLayer, selectedRegion],
  );
  const filteredFacts = useMemo(() => {
    if (factCategory === "All") return introFacts;
    return introFacts.filter((fact) => fact.category === factCategory);
  }, [factCategory]);

  function resetExplorer() {
    setQuery("");
    setSelectedRegionId("");
    setSelectedDistrict(districts[0]);
    setActiveLayer("Districts");
    setMapFocus(false);
  }

  function cycleLayer() {
    const nextIndex = (layerOrder.indexOf(activeLayer) + 1) % layerOrder.length;
    setActiveLayer(layerOrder[nextIndex]);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Interactive Rajasthan District Map"
        description="Click districts, search by name, highlight regions, and turn basic Rajasthan Introduction facts into studied topics."
        badge="Live atlas"
        actions={
          <Button
            variant="secondary"
            icon={MapPinned}
            onClick={resetExplorer}
          >
            Reset explorer
          </Button>
        }
      />

      <div className={mapFocus ? "grid gap-6" : "grid gap-6 xl:grid-cols-[1fr_360px]"}>
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
            onZoomToggle={() => setMapFocus((value) => !value)}
            onCycleLayer={cycleLayer}
            zoomed={mapFocus}
            onReset={() => {
              setQuery("");
              setSelectedRegionId("");
            }}
          />

          <RajasthanMap
            selectedDistrictId={selectedDistrict?.id}
            selectedRegion={selectedRegion}
            visibleDistricts={visibleDistricts}
            districtFillMap={layerView.districtFillMap}
            highlightedDistrictIds={layerView.highlightedDistrictIds}
            emphasizedDistrictIds={layerView.emphasizedDistrictIds}
            lineFeatures={layerView.lineFeatures}
            onSelectDistrict={setSelectedDistrict}
          />
          <MapLegend selectedRegion={selectedRegion} items={layerView.legendItems} />

          {query && !visibleDistricts.length ? (
            <EmptyState
              title="No district found"
              description="Try another spelling, search a nearby region, or clear the filter."
            />
          ) : null}
        </div>

        {mapFocus ? null : (
          <DistrictInfoPanel
            district={selectedDistrict}
            onMarkStudied={markTopicComplete}
          />
        )}
      </div>

      {mapFocus ? (
        <div className="mt-6">
          <DistrictInfoPanel
            district={selectedDistrict}
            onMarkStudied={markTopicComplete}
          />
        </div>
      ) : null}

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

        <p className="mt-5 max-w-3xl text-sm leading-6 text-desert-700">
          Use the filters with map layers to connect facts to their districts before marking them studied.
        </p>
      </section>
    </div>
  );
}

function buildLayerView(activeLayer, selectedRegion) {
  if (activeLayer === "Regions") {
    const districtFillMap = selectedRegion
      ? Object.fromEntries(selectedRegion.districts.map((id) => [id, selectedRegion.color]))
      : Object.fromEntries(
          regions.flatMap((region) =>
            region.districts.map((districtId) => [districtId, region.color]),
          ),
        );
    const legendItems = selectedRegion
      ? [{ label: selectedRegion.name, color: selectedRegion.color, border: "#172d4f" }]
      : regions.slice(0, 6).map((region) => ({
          label: region.name,
          color: region.color,
          border: "#172d4f",
        }));

    return {
      districtFillMap,
      highlightedDistrictIds: selectedRegion?.districts || [],
      emphasizedDistrictIds: selectedRegion?.districts || [],
      lineFeatures: [],
      legendItems,
    };
  }

  if (activeLayer === "Divisions") {
    return {
      districtFillMap: Object.fromEntries(
        districts.map((district) => [district.id, divisionColors[district.division] || "#94a3b8"]),
      ),
      highlightedDistrictIds: [],
      emphasizedDistrictIds: [],
      lineFeatures: [],
      legendItems: Object.entries(divisionColors).map(([label, color]) => ({
        label,
        color,
        border: "#172d4f",
      })),
    };
  }

  if (activeLayer === "Rivers") {
    return {
      districtFillMap: buildFeatureFillMap(rivers, 0.5),
      highlightedDistrictIds: [],
      emphasizedDistrictIds: rivers.flatMap((river) => river.districtIds || []),
      lineFeatures: rivers.map((river) => ({
        path: river.path,
        color: river.color,
        strokeWidth: "1.4",
        label: river.name,
      })),
      legendItems: rivers.map((river) => ({
        label: river.name,
        color: river.color,
        border: river.color,
      })),
    };
  }

  if (activeLayer === "Soil") {
    return {
      districtFillMap: buildFeatureFillMap(soils, 0.58),
      highlightedDistrictIds: [],
      emphasizedDistrictIds: [],
      lineFeatures: [],
      legendItems: soils.slice(0, 7).map((soil) => ({
        label: soil.name,
        color: soil.color,
        border: "#172d4f",
      })),
    };
  }

  if (activeLayer === "Climate") {
    return {
      districtFillMap: buildFeatureFillMap(climateZones, 0.58),
      highlightedDistrictIds: [],
      emphasizedDistrictIds: [],
      lineFeatures: [],
      legendItems: climateZones.map((zone) => ({
        label: zone.name,
        color: zone.color,
        border: "#172d4f",
      })),
    };
  }

  return {
    districtFillMap: {},
    highlightedDistrictIds: selectedRegion?.districts || [],
    emphasizedDistrictIds: selectedRegion?.districts || [],
    lineFeatures: [],
    legendItems: null,
  };
}

function buildFeatureFillMap(features, opacity = 0.5) {
  return features.reduce((fillMap, feature) => {
    (feature.districtIds || feature.districts || []).forEach((districtId) => {
      fillMap[districtId] = addAlpha(feature.color || "#2563eb", opacity);
    });
    return fillMap;
  }, {});
}

function addAlpha(hexColor, opacity) {
  const value = String(hexColor || "#2563eb").replace("#", "");
  const alpha = Math.round(opacity * 255).toString(16).padStart(2, "0");
  return `#${value}${alpha}`;
}
