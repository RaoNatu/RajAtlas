import { BookMarked, ExternalLink, Landmark, MapPin, Star } from "lucide-react";
import Badge from "../common/Badge";
import Button from "../common/Button";
import Card from "../common/Card";
import { getDistrictProfile } from "../../data/districtProfiles";
import fallbackDistrictPhoto from "../../assets/photos/hawa-mahal.jpg";

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

      <div className="mt-5 grid grid-cols-3 gap-2">
        {profile.photos.map((photo) => (
          <figure
            key={photo.label}
            className="overflow-hidden rounded-lg border border-desert-100 bg-white"
          >
            <img
              src={photo.src}
              alt={`${photo.label} in ${district.name}`}
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = photo.fallbackSrc || fallbackDistrictPhoto;
              }}
            />
            <figcaption className="truncate px-2 py-1.5 text-[11px] font-bold text-desert-700">
              {photo.label}
            </figcaption>
          </figure>
        ))}
      </div>

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
