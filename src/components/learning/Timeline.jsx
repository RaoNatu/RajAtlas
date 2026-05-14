import Badge from "../common/Badge";

export default function Timeline({ items = [] }) {
  if (!items.length) {
    return (
      <div className="rounded-lg border border-dashed border-desert-300 bg-desert-50 p-5 text-sm font-semibold text-desert-700">
        Timeline data will appear here in a future phase.
      </div>
    );
  }

  return (
    <ol className="relative border-l border-desert-300 pl-5">
      {items.map((item) => (
        <li key={item.id} className="mb-6 last:mb-0">
          <span className="absolute -left-2.5 mt-1 h-5 w-5 rounded-full border-4 border-white bg-royal-700" />
          <Badge color="gold">{item.period}</Badge>
          <h3 className="mt-2 text-lg font-black text-desert-900">{item.title}</h3>
          <p className="mt-1 text-sm leading-6 text-desert-700">{item.description}</p>
        </li>
      ))}
    </ol>
  );
}
