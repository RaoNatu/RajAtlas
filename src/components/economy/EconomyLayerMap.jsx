import { useMemo } from "react";
import { economyLayers } from "../../data/economy";
import Badge from "../common/Badge";
import Card from "../common/Card";
import SvgDistrictMap from "../map/SvgDistrictMap";

export default function EconomyLayerMap({ activeLayer, selectedItem, onSelectItem }) {
  const items = economyLayers[activeLayer] || [];
  const fillMap = useMemo(
    () => (activeLayer === "Transport" ? {} : buildFillMap(items)),
    [activeLayer, items],
  );
  const lineFeatures = useMemo(
    () =>
      activeLayer === "Transport"
        ? items.map((corridor) => ({
            id: corridor.id,
            path: corridor.path,
            color: corridor.color,
            strokeWidth: selectedItem?.id === corridor.id ? "1.8" : "1.1",
            isSelected: selectedItem?.id === corridor.id,
            label: corridor.name,
            onSelect: () => onSelectItem(corridor),
          }))
        : [],
    [activeLayer, items, onSelectItem, selectedItem],
  );

  function selectByDistrict(district) {
    const match = items.find((item) => item.districtIds.includes(district.id));
    if (match) onSelectItem(match);
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="grid gap-0 lg:grid-cols-[1fr_320px]">
        <SvgDistrictMap
          districtFillMap={fillMap}
          emphasizedDistrictIds={selectedItem?.districtIds || []}
          lineFeatures={lineFeatures}
          onSelectDistrict={selectByDistrict}
          ariaLabel={`Rajasthan economy ${activeLayer} layer map`}
          className="rounded-none border-0 shadow-none"
        />

        <div className="border-t border-desert-200 bg-white p-5 lg:border-l lg:border-t-0">
          <Badge color="blue">{activeLayer}</Badge>
          <h3 className="mt-3 text-xl font-black text-desert-900">
            Economy layer
          </h3>
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
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span className="block font-black text-desert-900">{item.name}</span>
                    <span className="mt-1 block text-xs font-semibold uppercase tracking-wide text-desert-600">
                      {item.category}
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
                {selectedItem.memoryHook}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

function buildFillMap(items) {
  const fillMap = {};
  items.forEach((item) => {
    const fill = item.color;
    item.districtIds.forEach((districtId) => {
      fillMap[districtId] = fill;
    });
  });
  return fillMap;
}
