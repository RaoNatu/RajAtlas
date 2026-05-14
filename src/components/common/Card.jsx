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
        "rounded-lg border border-desert-200/80 bg-white/90 shadow-soft backdrop-blur",
        interactive
          ? "transition hover:-translate-y-0.5 hover:border-royal-300 hover:shadow-lg"
          : "",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </Component>
  );
}
