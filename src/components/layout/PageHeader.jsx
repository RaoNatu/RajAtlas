import Badge from "../common/Badge";

export default function PageHeader({
  eyebrow = "Rajasthan Introduction",
  title,
  description,
  badge,
  actions,
}) {
  return (
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wide text-royal-800">
            {eyebrow}
          </span>
          {badge ? <Badge color="gold">{badge}</Badge> : null}
        </div>
        <h1 className="text-3xl font-black text-desert-900 sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-base leading-7 text-desert-700">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}
