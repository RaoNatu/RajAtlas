export default function Card({
  children,
  className = "",
  interactive = false,
  as: Component = "section",
  ...props
}) {
  return (
    <Component
      className={[
        "rounded-lg border border-slate-200 bg-white shadow-sm",
        interactive
          ? "transition hover:-translate-y-0.5 hover:border-royal-300 hover:shadow-md"
          : "",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </Component>
  );
}
