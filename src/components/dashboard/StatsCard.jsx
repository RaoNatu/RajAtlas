import Card from "../common/Card";

export default function StatsCard({ label, value, helper, icon: Icon, tone = "blue" }) {
  const toneClasses = {
    blue: "bg-royal-50 text-royal-800",
    sand: "bg-desert-100 text-desert-900",
    maroon: "bg-maroon-50 text-maroon-800",
    green: "bg-emerald-50 text-emerald-800",
  };

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-desert-600">{label}</p>
          <p className="mt-2 text-3xl font-black text-desert-900">{value}</p>
          {helper ? (
            <p className="mt-2 text-sm leading-6 text-desert-700">{helper}</p>
          ) : null}
        </div>
        {Icon ? (
          <div className={`rounded-lg p-3 ${toneClasses[tone]}`}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        ) : null}
      </div>
    </Card>
  );
}
