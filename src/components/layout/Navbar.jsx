import { useState } from "react";
import { Landmark, LogIn, Menu, UserRound, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const navItems = [
    { label: t("home"), to: "/" },
    { label: t("map"), to: "/map" },
    { label: t("regions"), to: "/regions" },
    { label: t("quiz"), to: "/quiz" },
    { label: t("progress"), to: "/progress" },
    { label: t("learn"), to: "/learn" },
  ];
  const moduleItems = [
    { label: t("geography"), to: "/geography" },
    { label: t("economy"), to: "/economy" },
    { label: t("politics"), to: "/politics" },
    { label: t("history"), to: "/history" },
    { label: t("culture"), to: "/culture" },
  ];
  const accountItems = user
    ? [{ label: t("dashboard"), to: "/dashboard" }]
    : [
        { label: t("login"), to: "/login" },
        { label: t("register"), to: "/register" },
      ];
  const allItems = [...navItems, ...moduleItems, ...accountItems];

  const linkClasses = ({ isActive }) =>
    [
      "rounded-lg px-3 py-2 text-sm font-semibold transition",
      isActive
        ? "bg-royal-700 text-white shadow-sm"
        : "text-desert-800 hover:bg-desert-100 hover:text-royal-800",
    ].join(" ");

  return (
    <header className="sticky top-0 z-40 border-b border-desert-200/80 bg-white/92 backdrop-blur-xl">
      <nav className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-royal-900 text-amber-300 shadow-sm">
            <Landmark className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-black uppercase tracking-wide text-desert-900">
              RajAtlas
            </span>
            <span className="block text-xs font-semibold text-royal-800">
              {t("brandSubline")}
            </span>
          </span>
        </NavLink>

        <div className="fixed right-4 top-3 z-50 flex lg:hidden">
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-desert-200 bg-white text-desert-900 shadow-sm transition hover:border-royal-300 hover:text-royal-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-royal-100"
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
        </div>

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
          <div className="mx-2 h-6 w-px bg-desert-200" />
          {user ? (
            <NavLink to="/dashboard" className={linkClasses}>
              <span className="inline-flex items-center gap-2">
                <UserRound className="h-4 w-4" aria-hidden="true" />
                {t("dashboard")}
              </span>
            </NavLink>
          ) : (
            <NavLink to="/login" className={linkClasses}>
              <span className="inline-flex items-center gap-2">
                <LogIn className="h-4 w-4" aria-hidden="true" />
                {t("login")}
              </span>
            </NavLink>
          )}
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-lg border border-desert-200 bg-white px-3 py-2 text-sm font-black text-desert-800 transition hover:border-royal-300 hover:text-royal-800"
            aria-label={t("language")}
          >
            {language === "en" ? "हिंदी" : "EN"}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-desert-200 bg-desert-50 px-4 py-3 lg:hidden"
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center justify-center rounded-lg border border-desert-200 bg-white px-3 py-2 text-center text-sm font-black text-desert-800"
            >
              {language === "en" ? "हिंदी" : "EN"}
            </button>
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
