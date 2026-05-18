import { useEffect, useState } from "react";
import { BookMarked, ExternalLink, Landmark, MapPin, Sparkles, Star } from "lucide-react";
import Badge from "../common/Badge";
import Button from "../common/Button";
import Card from "../common/Card";
import { getDistrictProfile } from "../../data/districtProfiles";

export default function DistrictInfoPanel({ district, onMarkStudied }) {
  if (!district) {
    return (
      <Card className="p-6">
        <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
          <MapPin className="mb-4 h-10 w-10 text-royal-700" aria-hidden="true" />
          <h2 className="text-xl font-black text-desert-900">Choose a district</h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-desert-700">
            Hover or tap a district marker to reveal its division, region, nickname,
            border clues, and memory hooks.
          </p>
        </div>
      </Card>
    );
  }

  const profile = getDistrictProfile(district);
  const places = profile.places || [];
  const [selectedPlaceLabel, setSelectedPlaceLabel] = useState(places[0]?.label || "");
  const selectedPlace =
    places.find((place) => place.label === selectedPlaceLabel) || places[0];

  useEffect(() => {
    setSelectedPlaceLabel(places[0]?.label || "");
  }, [district.id]);

  const rows = [
    ["Status", district.administrativeStatus],
    ["Division", district.division],
    ["Region", district.region],
    ["Area", district.area],
    ["Important city", district.importantCity],
    ["Ancient name", district.ancientName],
    ["Border information", district.borderInfo],
  ];

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge color="blue">{district.region}</Badge>
          <h2 className="mt-3 text-2xl font-black text-desert-900">
            {district.name}
          </h2>
          <p className="mt-1 text-sm font-semibold text-royal-800">
            {district.nickname}
          </p>
        </div>
        <div className="rounded-lg bg-desert-100 p-3 text-desert-800">
          <MapPin className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-5 space-y-3 rounded-lg bg-royal-50 p-4">
        <div className="flex items-center gap-2 text-sm font-black text-royal-900">
          <Landmark className="h-4 w-4" aria-hidden="true" />
          Beginner overview
        </div>
        <p className="text-sm leading-6 text-royal-950">{profile.overview}</p>
      </div>

      {places.length ? (
        <div className="mt-5 rounded-lg border border-desert-100 bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-black text-desert-900">
            <Sparkles className="h-4 w-4 text-amber-600" aria-hidden="true" />
            Popular places
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {places.map((place) => {
              const active = place.label === selectedPlace?.label;
              return (
                <button
                  key={place.label}
                  type="button"
                  onClick={() => setSelectedPlaceLabel(place.label)}
                  className={[
                    "rounded-lg border px-3 py-3 text-left transition",
                    active
                      ? "border-royal-300 bg-royal-50 text-royal-950"
                      : "border-desert-200 bg-desert-50 text-desert-900 hover:border-royal-200 hover:bg-white",
                  ].join(" ")}
                >
                  <span className="block text-sm font-black">{place.label}</span>
                  <span className="mt-1 block text-[11px] font-semibold uppercase tracking-wide text-desert-500">
                    Tap for notes
                  </span>
                </button>
              );
            })}
          </div>

          {selectedPlace ? (
            <div className="mt-4 rounded-lg bg-desert-50 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-base font-black text-desert-900">{selectedPlace.label}</p>
                  <p className="mt-2 text-sm leading-6 text-desert-700">
                    {selectedPlace.description}
                  </p>
                </div>
              </div>
              {selectedPlace.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedPlace.tags.map((tag) => (
                    <Badge key={tag} color="sand">
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-5 divide-y divide-desert-100 rounded-lg border border-desert-100 bg-desert-50/70">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[120px_1fr] gap-3 px-4 py-3 text-sm">
            <span className="font-semibold text-desert-600">{label}</span>
            <span className="font-semibold text-desert-900">{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="text-sm font-black text-desert-900">Brief history</p>
          <a
            href={profile.readMore}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-black text-royal-800 hover:text-royal-950"
          >
            Read more
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
        <p className="text-sm leading-6 text-desert-700">{profile.history}</p>
      </div>

      <div className="mt-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-desert-900">
          <Star className="h-4 w-4 text-amber-600" aria-hidden="true" />
          Memory hooks
        </div>
        <div className="flex flex-wrap gap-2">
          {district.famousFor.map((item) => (
            <Badge key={item} color="gold">
              {item}
            </Badge>
          ))}
        </div>
      </div>

      <Button
        className="mt-6 w-full"
        variant="secondary"
        icon={BookMarked}
        onClick={() => onMarkStudied?.(district.id, `${district.name} district`)}
      >
        Mark district studied
      </Button>
    </Card>
  );
}
