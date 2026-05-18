import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, LockKeyhole, LogIn, Mail, UserPlus } from "lucide-react";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import { useAuth } from "../contexts/AuthContext";
import hawaMahal from "../assets/photos/hawa-mahal.jpg";

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, login, register, serviceError } = useAuth();
  const initialMode = location.pathname.includes("register") ? "register" : "login";
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [loading, navigate, user]);

  const title = mode === "register" ? "Create your study account" : "Welcome back";
  const helper =
    mode === "register"
      ? "Save your profile, secure your account, and keep your Rajasthan GK practice organized."
      : "Sign in to open your dashboard, review progress, and manage your account.";
  const switchTarget = mode === "register" ? "/login" : "/register";
  const switchCopy = mode === "register" ? "Already have an account?" : "New to RajAtlas?";

  const highlights = useMemo(
    () => [
      "Secure email and password authentication",
      "Account dashboard with profile controls",
      "Progress, bookmarks, XP, and quiz history in one place",
    ],
    [],
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (mode === "register") {
        await register(form);
      } else {
        await login({ email: form.email, password: form.password });
      }
      navigate("/dashboard");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  }

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid overflow-hidden rounded-lg border border-desert-200 bg-white shadow-soft lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[360px] bg-desert-900 text-white">
          <img
            src={hawaMahal}
            alt="Hawa Mahal facade in Jaipur"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-desert-900/82 via-desert-900/44 to-royal-900/62" />
          <div className="relative flex h-full min-h-[360px] flex-col justify-end p-6 sm:p-8 lg:p-10">
            <Badge color="gold" className="w-fit">RajAtlas Account</Badge>
            <h1 className="mt-4 max-w-lg text-4xl font-black leading-tight sm:text-5xl">
              A calmer way to prepare Rajasthan GK.
            </h1>
            <div className="mt-6 grid gap-3">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-semibold text-desert-50">
                  <CheckCircle2 className="h-5 w-5 text-amber-300" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card className="rounded-none border-0 bg-white p-6 shadow-none sm:p-8 lg:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
                {mode === "register" ? "Registration" : "Login"}
              </p>
              <h2 className="mt-2 text-3xl font-black text-desert-900">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-desert-700">{helper}</p>
            </div>
            <div className="rounded-lg bg-royal-50 p-3 text-royal-800">
              {mode === "register" ? (
                <UserPlus className="h-5 w-5" aria-hidden="true" />
              ) : (
                <LogIn className="h-5 w-5" aria-hidden="true" />
              )}
            </div>
          </div>

          {serviceError ? (
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900">
              {serviceError}
            </div>
          ) : null}

          {error ? (
            <div className="mt-5 rounded-lg border border-maroon-200 bg-maroon-50 p-4 text-sm font-semibold leading-6 text-maroon-900">
              {error}
            </div>
          ) : null}

          <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
            {mode === "register" ? (
              <label className="grid gap-2 text-sm font-bold text-desert-700">
                Name
                <input
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  className="h-12 rounded-lg border border-desert-200 bg-white px-4 text-base font-semibold text-desert-900 outline-none focus:border-royal-400 focus:ring-4 focus:ring-royal-100"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </label>
            ) : null}

            <label className="grid gap-2 text-sm font-bold text-desert-700">
              Email
              <span className="flex h-12 items-center gap-3 rounded-lg border border-desert-200 bg-white px-4 focus-within:border-royal-400 focus-within:ring-4 focus-within:ring-royal-100">
                <Mail className="h-4 w-4 text-desert-500" aria-hidden="true" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-base font-semibold text-desert-900 outline-none"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </span>
            </label>

            <label className="grid gap-2 text-sm font-bold text-desert-700">
              Password
              <span className="flex h-12 items-center gap-3 rounded-lg border border-desert-200 bg-white px-4 focus-within:border-royal-400 focus-within:ring-4 focus-within:ring-royal-100">
                <LockKeyhole className="h-4 w-4 text-desert-500" aria-hidden="true" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) => updateField("password", event.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-base font-semibold text-desert-900 outline-none"
                  placeholder="At least 8 characters"
                  autoComplete={mode === "register" ? "new-password" : "current-password"}
                  minLength={8}
                  required
                />
              </span>
            </label>

            <Button type="submit" icon={mode === "register" ? UserPlus : LogIn} disabled={submitting}>
              {submitting
                ? "Please wait..."
                : mode === "register"
                  ? "Create account"
                  : "Log in"}
            </Button>
          </form>

          <p className="mt-6 text-sm font-semibold text-desert-700">
            {switchCopy}{" "}
            <Link to={switchTarget} className="font-black text-royal-800 hover:text-royal-900">
              {mode === "register" ? "Log in" : "Create an account"}
            </Link>
          </p>
        </Card>
      </section>
    </div>
  );
}
