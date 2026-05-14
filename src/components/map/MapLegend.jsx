export default function MapLegend({ selectedRegion }) {
  const items = [
    { label: "Selected district", color: "#dbeafe", border: "#172d4f" },
    {
      label: selectedRegion ? `${selectedRegion.name} districts` : "Region highlight",
      color: selectedRegion?.color || "#e5e7eb",
      border: "#374151",
    },
    { label: "Available district", color: "#f8fafc", border: "#374151" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-desert-200 bg-white/88 px-4 py-3 text-xs font-semibold text-desert-700 shadow-sm">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-2">
          <span
            className="h-3.5 w-3.5 rounded-full border"
            style={{
              backgroundColor: item.color,
              borderColor: item.border || item.color,
            }}
            aria-hidden="true"
          />
          {item.label}
        </span>
      ))}
    </div>
  );
}
