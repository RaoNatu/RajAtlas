import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search",
  className = "",
}) {
  return (
    <label
      className={[
        "flex h-11 items-center gap-3 rounded-lg border border-desert-200 bg-white px-3 text-sm text-desert-600 shadow-insetSoft focus-within:border-royal-400 focus-within:ring-4 focus-within:ring-royal-100",
        className,
      ].join(" ")}
    >
      <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-desert-900 outline-none placeholder:text-desert-500"
      />
    </label>
  );
}
