import Badge from "../common/Badge";
import Card from "../common/Card";

export default function RegionHighlighter({ region, districts = [], onDistrictSelect }) {
  if (!region) {
    return (
      <Card className="p-5">
        <h3 className="text-lg font-black text-desert-900">Region highlight</h3>
        <p className="mt-2 text-sm leading-6 text-desert-700">
          Select a region to highlight related districts on the map.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge color="blue">{region.category}</Badge>
          <h3 className="mt-3 text-xl font-black text-desert-900">{region.name}</h3>
        </div>
        <span
          className="h-9 w-9 rounded-lg ring-2 ring-white"
          style={{ backgroundColor: region.color }}
          aria-hidden="true"
        />
      </div>
      <p className="mt-3 text-sm leading-6 text-desert-700">{region.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {districts.map((district) => (
          <button
            key={district.id}
            type="button"
            onClick={() => onDistrictSelect?.(district)}
            className="rounded-full border border-desert-200 bg-desert-50 px-3 py-1.5 text-xs font-bold text-desert-800 transition hover:border-royal-300 hover:text-royal-800"
          >
            {district.name}
          </button>
        ))}
      </div>
    </Card>
  );
}
