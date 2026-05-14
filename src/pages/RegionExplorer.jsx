import { useEffect, useMemo, useState } from "react";
import { Compass } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import DistrictInfoPanel from "../components/map/DistrictInfoPanel";
import MapLegend from "../components/map/MapLegend";
import RajasthanMap from "../components/map/RajasthanMap";
import RegionHighlighter from "../components/map/RegionHighlighter";
import { districts } from "../data/districts";
import { regions } from "../data/regions";
import { useProgress } from "../hooks/useProgress";
import { getDistrictsByRegion } from "../utils/mapHelpers";

export default function RegionExplorer() {
  const [selectedRegionId, setSelectedRegionId] = useState("mewar");
  const [selectedDistrict, setSelectedDistrict] = useState(districts[1]);
  const { markTopicComplete, setLastOpenedModule } = useProgress();

  useEffect(() => {
    setLastOpenedModule("Region Explorer");
  }, [setLastOpenedModule]);

  const selectedRegion = regions.find((region) => region.id === selectedRegionId);
  const regionDistricts = useMemo(
    () => getDistrictsByRegion(selectedRegion),
    [selectedRegion],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Region Explorer"
        description="Select a historical or cultural region and see the related districts highlighted on the map."
        badge="Phase 1"
      />

      <div className="grid gap-6 xl:grid-cols-[280px_1fr_340px]">
        <Card className="p-4">
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-royal-800">
            Select region
          </p>
          <div className="space-y-2">
            {regions.map((region) => (
              <button
                key={region.id}
                type="button"
                onClick={() => {
                  setSelectedRegionId(region.id);
                  const firstDistrict = getDistrictsByRegion(region)[0];
                  if (firstDistrict) setSelectedDistrict(firstDistrict);
                }}
                className={[
                  "flex w-full items-center justify-between rounded-lg border px-3 py-3 text-left text-sm font-bold transition",
                  selectedRegionId === region.id
                    ? "border-royal-300 bg-royal-50 text-royal-900"
                    : "border-desert-200 bg-white text-desert-800 hover:border-royal-200",
                ].join(" ")}
              >
                <span>{region.name}</span>
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: region.color }}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <RegionHighlighter
            region={selectedRegion}
            districts={regionDistricts}
            onDistrictSelect={setSelectedDistrict}
          />
          <RajasthanMap
            selectedDistrictId={selectedDistrict?.id}
            selectedRegion={selectedRegion}
            visibleDistricts={districts}
            onSelectDistrict={setSelectedDistrict}
          />
          <MapLegend selectedRegion={selectedRegion} />
        </div>

        <DistrictInfoPanel
          district={selectedDistrict}
          onMarkStudied={markTopicComplete}
        />
      </div>

      <section className="mt-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
              Region memory cards
            </p>
            <h2 className="mt-2 text-3xl font-black text-desert-900">
              Convert names into clusters
            </h2>
          </div>
          <Button
            variant="secondary"
            icon={Compass}
            onClick={() =>
              markTopicComplete(`region-${selectedRegion.id}`, `${selectedRegion.name} region`)
            }
          >
            Mark selected region studied
          </Button>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {regions.map((region) => (
            <Card key={region.id} className="p-5" interactive>
              <div className="flex items-start justify-between gap-3">
                <Badge color="blue">{region.category}</Badge>
                <span
                  className="h-8 w-8 rounded-lg"
                  style={{ backgroundColor: region.color }}
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-4 text-xl font-black text-desert-900">{region.name}</h3>
              <p className="mt-2 text-sm leading-6 text-desert-700">
                {region.description}
              </p>
              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wide text-desert-600">
                  Important cities
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {region.importantCities.map((city) => (
                    <Badge key={city} color="gold">
                      {city}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-desert-700">
                {region.culturalImportance}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
