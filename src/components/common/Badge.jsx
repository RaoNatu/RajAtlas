const colorStyles = {
  sand: "bg-desert-100 text-desert-800 ring-desert-200",
  blue: "bg-royal-50 text-royal-800 ring-royal-200",
  maroon: "bg-maroon-50 text-maroon-800 ring-maroon-200",
  green: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  gold: "bg-amber-100 text-amber-900 ring-amber-200",
};

export default function Badge({ children, color = "sand", className = "" }) {
  return (
    <span
      className={[
        "inline-flex max-w-full items-center rounded-full px-2.5 py-1 text-left text-xs font-semibold leading-snug ring-1",
        colorStyles[color],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
