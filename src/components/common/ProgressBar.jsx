export default function ProgressBar({
  value = 0,
  label = "Progress",
  showLabel = true,
  className = "",
}) {
  const safeValue = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div className={className}>
      {showLabel ? (
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-desert-800">{label}</span>
          <span className="font-semibold text-royal-800">{safeValue}%</span>
        </div>
      ) : null}
      <div className="h-3 overflow-hidden rounded-full bg-desert-100 ring-1 ring-desert-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-royal-700 via-royal-500 to-amber-500 transition-all duration-500"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
