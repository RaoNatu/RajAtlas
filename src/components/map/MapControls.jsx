import { CircleArrowRight, Layers, LocateFixed, Maximize2 } from "lucide-react";
import Button from "../common/Button";
import Badge from "../common/Badge";

const layers = ["Districts", "Regions", "Divisions", "Rivers", "Soil", "Climate"];

export default function MapControls({
  activeLayer = "Districts",
  onLayerChange,
  onReset,
  onZoomToggle,
  onCycleLayer,
  zoomed = false,
  selectedRegion,
}) {
  const currentLayerIndex = Math.max(layers.indexOf(activeLayer), 0);
  const nextLayer = layers[(currentLayerIndex + 1) % layers.length];

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-desert-200 bg-white/88 p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-black text-desert-900">
          <Layers className="h-4 w-4 text-royal-700" aria-hidden="true" />
          Map layers
        </div>
        {selectedRegion ? <Badge color="blue">{selectedRegion.name} highlighted</Badge> : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {layers.map((layer) => (
          <Button
            key={layer}
            variant={activeLayer === layer ? "primary" : "outline"}
            size="sm"
            onClick={() => onLayerChange(layer)}
            title={`${layer} layer`}
          >
            {layer}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          icon={LocateFixed}
          onClick={onReset}
          className="shrink-0"
        >
          Reset view
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon={Maximize2}
          onClick={onZoomToggle}
          title={zoomed ? "Show map with district panel" : "Focus the map"}
          className="shrink-0"
        >
          {zoomed ? "Split view" : "Focus map"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon={CircleArrowRight}
          onClick={onCycleLayer}
          title={`Switch to ${nextLayer} layer`}
          className="shrink-0"
        >
          Show {nextLayer}
        </Button>
      </div>
    </div>
  );
}
