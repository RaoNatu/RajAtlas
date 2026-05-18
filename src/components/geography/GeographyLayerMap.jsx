import { Droplets, Leaf, Mountain, Waves } from "lucide-react";
import { useMemo } from "react";
import { climateZones } from "../../data/climate";
import { irrigationProjects, wildlifeAreas } from "../../data/geography";
import { lakes } from "../../data/lakes";
import { rivers } from "../../data/rivers";
import { soils } from "../../data/soil";
import Badge from "../common/Badge";
import Card from "../common/Card";
import SvgDistrictMap from "../map/SvgDistrictMap";

export default function GeographyLayerMap({ activeLayer, selectedItem, onSelectItem }) {
  const items = getLayerItems(activeLayer);
  const usesDistrictFill = activeLayer !== "Rivers";
  const districtFillMap = useMemo(
    () => (usesDistrictFill ? buildDistrictFillMap(activeLayer, items) : {}),
    [activeLayer, items, usesDistrictFill],
  );
  const lineFeatures = useMemo(
    () =>
      activeLayer === "Rivers"
        ? rivers.map((river) => ({
            id: river.id,
            path: river.path,
            color: river.color,
            strokeWidth: selectedItem?.id === river.id ? "1.9" : "1.15",
            isSelected: selectedItem?.id === river.id,
            label: river.name,
            onSelect: () => onSelectItem(river),
          }))
        : [],
    [activeLayer, onSelectItem, selectedItem],
  );

  function selectByDistrict(district) {
    const match = items.find((item) => getDistrictIds(item).includes(district.id));
    if (match) onSelectItem(match);
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="grid gap-0 lg:grid-cols-[1fr_320px]">
        <div className="relative">
          <SvgDistrictMap
            districtFillMap={districtFillMap}
            selectedDistrictId=""
            emphasizedDistrictIds={selectedItem ? getDistrictIds(selectedItem) : []}
            lineFeatures={lineFeatures}
            onSelectDistrict={selectByDistrict}
            ariaLabel={`Rajasthan geography ${activeLayer} layer map`}
            className="rounded-none border-0 shadow-none"
          />
        </div>

        <div className="border-t border-desert-200 bg-white p-5 lg:border-l lg:border-t-0">
          <div className="flex items-center gap-2">
            {getLayerIcon(activeLayer)}
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-royal-800">
                Active layer
              </p>
              <h3 className="text-xl font-black text-desert-900">{activeLayer}</h3>
            </div>
          </div>

          <div className="mt-5 max-h-[430px] space-y-3 overflow-y-auto pr-1">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectItem(item)}
                className={[
                  "w-full rounded-lg border p-3 text-left transition",
                  selectedItem?.id === item.id
                    ? "atlas-selected-card border-royal-300 bg-white"
                    : "border-desert-200 bg-desert-50 hover:border-royal-200",
                ].join(" ")}
              >
                <span className="flex items-start gap-3">
                  <span
                    className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full border border-white shadow-sm ring-1 ring-desert-200"
                    style={{ backgroundColor: getLayerColor(activeLayer, item, 0) }}
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span className="block font-black text-desert-900">
                      {item.name || item.title}
                    </span>
                    <span className="mt-1 block text-xs font-semibold text-desert-600">
                      {item.basin || item.type || item.region || item.district}
                    </span>
                  </span>
                </span>
              </button>
            ))}
          </div>

          {selectedItem ? (
            <div className="mt-5 rounded-lg bg-desert-50 p-4">
              <Badge color="gold">Memory hook</Badge>
              <p className="mt-3 text-sm leading-6 text-desert-800">
                {selectedItem.memoryHook || selectedItem.note || selectedItem.description}
              </p>
              {selectedItem.origin || selectedItem.flow || selectedItem.sourceNote ? (
                <div className="mt-4 space-y-2 border-t border-desert-200 pt-4 text-sm leading-6 text-desert-700">
                  {selectedItem.origin ? (
                    <p>
                      <span className="font-black text-desert-900">Origin:</span>{" "}
                      {selectedItem.origin}
                    </p>
                  ) : null}
                  {selectedItem.flow ? (
                    <p>
                      <span className="font-black text-desert-900">Flow:</span>{" "}
                      {selectedItem.flow}
                    </p>
                  ) : null}
                  {selectedItem.sourceNote ? (
                    <p className="text-xs font-bold text-royal-800">{selectedItem.sourceNote}</p>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

function buildDistrictFillMap(activeLayer, items) {
  const fillMap = {};
  items.forEach((item, index) => {
    const fill = getLayerColor(activeLayer, item, index);
    getDistrictIds(item).forEach((districtId) => {
      fillMap[districtId] = fill;
    });
  });
  return fillMap;
}

function getDistrictIds(item) {
  return item.districtIds || item.districts || [];
}

function getLayerColor(activeLayer, item, index) {
  if (item.color) return item.color;
  if (activeLayer === "Soil") return item.color;
  if (activeLayer === "Climate") return item.color;
  if (activeLayer === "Rivers") return "#dbeafe";
  if (activeLayer === "Lakes") return item.type === "Saltwater" ? "#a5f3fc" : "#bfdbfe";
  if (activeLayer === "Wildlife") return "#bbf7d0";
  if (activeLayer === "Irrigation") return "#bfdbfe";
  return ["#e5e7eb", "#d1d5db", "#f3f4f6"][index % 3];
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

function getLayerIcon(activeLayer) {
  const className = "h-5 w-5 text-royal-700";
  if (activeLayer === "Rivers" || activeLayer === "Irrigation") {
    return <Waves className={className} aria-hidden="true" />;
  }
  if (activeLayer === "Lakes") return <Droplets className={className} aria-hidden="true" />;
  if (activeLayer === "Wildlife") return <Leaf className={className} aria-hidden="true" />;
  return <Mountain className={className} aria-hidden="true" />;
}
