import { useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Map", to: "/map" },
  { label: "Regions", to: "/regions" },
  { label: "Quiz", to: "/quiz" },
  { label: "Progress", to: "/progress" },
  { label: "Learn", to: "/learn" },
];

const moduleItems = [
  { label: "Geography", to: "/geography" },
  { label: "Economy", to: "/economy" },
  { label: "Politics", to: "/politics" },
  { label: "History", to: "/history" },
  { label: "Culture", to: "/culture" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const allItems = [...navItems, ...moduleItems];

  const linkClasses = ({ isActive }) =>
    [
      "rounded-lg px-3 py-2 text-sm font-semibold transition",
      isActive
        ? "bg-royal-700 text-white shadow-sm"
        : "text-desert-800 hover:bg-desert-100 hover:text-royal-800",
    ].join(" ");

  return (
    <header className="sticky top-0 z-40 border-b border-desert-200/80 bg-desert-50/92 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-desert-900 text-amber-300 shadow-sm">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-black uppercase tracking-wide text-desert-900">
              RajAtlas
            </span>
            <span className="block text-xs font-semibold text-royal-800">
              Rajasthan GK by Natu
            </span>
          </span>
        </NavLink>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-desert-200 bg-white text-desert-900 shadow-sm transition hover:border-royal-300 hover:text-royal-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-royal-100 lg:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClasses}>
              {item.label}
            </NavLink>
          ))}
          <div className="mx-2 h-6 w-px bg-desert-200" />
          {moduleItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClasses}>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {menuOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-desert-200 bg-desert-50 px-4 py-3 lg:hidden"
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {allItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={(state) =>
                  `${linkClasses(state)} flex items-center justify-center text-center`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
