import { BookOpen, Landmark, Map, Palette, PieChart, ScrollText } from "lucide-react";
import { NavLink } from "react-router-dom";

const modules = [
  { label: "Introduction", to: "/", icon: BookOpen, section: "Start" },
  { label: "Geography", to: "/geography", icon: Map, section: "Maps" },
  { label: "Economy", to: "/economy", icon: PieChart, section: "Data" },
  { label: "Politics", to: "/politics", icon: Landmark, section: "Polity" },
  { label: "History", to: "/history", icon: ScrollText, section: "Timeline" },
  { label: "Culture", to: "/culture", icon: Palette, section: "Culture" },
];

export default function Sidebar({ className = "" }) {
  return (
    <aside
      className={[
        "rounded-lg border border-desert-200 bg-white/85 p-3 shadow-sm",
        className,
      ].join(" ")}
    >
      <p className="px-2 pb-2 text-xs font-bold uppercase tracking-wide text-desert-600">
        Module roadmap
      </p>
      <div className="space-y-1">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <NavLink
              key={module.to}
              to={module.to}
              className={({ isActive }) =>
                [
                  "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition",
                  isActive
                    ? "bg-royal-700 text-white"
                    : "text-desert-800 hover:bg-desert-100",
                ].join(" ")
              }
            >
              <span className="flex items-center gap-2">
                <Icon className="h-4 w-4" aria-hidden="true" />
                {module.label}
              </span>
              <span className="text-[11px] opacity-75">{module.section}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}
