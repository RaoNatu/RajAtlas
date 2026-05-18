import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  BarChart3,
  Bookmark,
  CalendarDays,
  KeyRound,
  LogOut,
  Mail,
  ShieldCheck,
  Trash2,
  Trophy,
  UserRound,
  Zap,
} from "lucide-react";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import ProgressBar from "../components/common/ProgressBar";
import StatsCard from "../components/dashboard/StatsCard";
import { useAuth } from "../contexts/AuthContext";
import { useProgress } from "../hooks/useProgress";
import { getCategoryAverages, getModuleCompletion } from "../utils/calculateProgress";

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    user,
    loading,
    serviceError,
    logout,
    updateEmail,
    updatePassword,
    deleteAccount,
  } = useAuth();
  const { progress, completionPercentage, level } = useProgress();
  const [emailForm, setEmailForm] = useState({ email: user?.email || "", password: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });
  const [deletePassword, setDeletePassword] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState("");

  const categoryAverages = useMemo(
    () => getCategoryAverages(progress.quizScores || []),
    [progress.quizScores],
  );
  const moduleCompletion = useMemo(
    () => getModuleCompletion(progress.completedTopics || []),
    [progress.completedTopics],
  );
  const bestCategory = categoryAverages
    .slice()
    .sort((a, b) => b.average - a.average)[0];
  const totalTopics = moduleCompletion.reduce((sum, module) => sum + module.total, 0);
  const completedTopics = moduleCompletion.reduce((sum, module) => sum + module.completed, 0);

  useEffect(() => {
    if (user?.email) {
      setEmailForm((current) => ({ ...current, email: user.email }));
    }
  }, [user?.email]);

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[54vh] max-w-7xl items-center justify-center px-4">
        <Card className="p-6 text-center">
          <UserRound className="mx-auto h-8 w-8 text-royal-700" aria-hidden="true" />
          <p className="mt-3 font-black text-desert-900">Opening your dashboard...</p>
        </Card>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  async function runAction(key, action) {
    setError("");
    setNotice("");
    setSubmitting(key);
    try {
      await action();
      setNotice("Account updated successfully.");
    } catch (actionError) {
      setError(actionError.message);
    } finally {
      setSubmitting("");
    }
  }

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-lg bg-gradient-to-br from-royal-900 via-desert-900 to-maroon-900 px-6 py-8 text-white shadow-soft sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge color="gold">Your dashboard</Badge>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              {user.name}'s RajAtlas
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-desert-50 sm:text-base">
              Manage your account, keep your study rhythm visible, and jump back into the
              Rajasthan GK areas that need attention.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" icon={Mail} onClick={() => navigate("/learn")}>
              Revision lab
            </Button>
            <Button variant="secondary" icon={LogOut} onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </div>
      </section>

      {serviceError ? (
        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900">
          {serviceError}
        </div>
      ) : null}

      {notice ? (
        <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-900">
          {notice}
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 rounded-lg border border-maroon-200 bg-maroon-50 p-4 text-sm font-semibold text-maroon-900">
          {error}
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          label="Completion"
          value={`${completionPercentage}%`}
          helper={`${completedTopics} of ${totalTopics} topics studied.`}
          icon={Trophy}
          tone="blue"
        />
        <StatsCard
          label="Level"
          value={level}
          helper={`${progress.xp || 0} XP and ${progress.streak || 0} day streak.`}
          icon={Zap}
          tone="green"
        />
        <StatsCard
          label="Quiz attempts"
          value={progress.quizScores?.length || 0}
          helper={bestCategory ? `Best area: ${bestCategory.category}` : "Start a quiz to build analytics."}
          icon={BarChart3}
          tone="sand"
        />
        <StatsCard
          label="Bookmarks"
          value={progress.bookmarks?.length || 0}
          helper="Saved districts, cards, and revision prompts."
          icon={Bookmark}
          tone="maroon"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
                Profile
              </p>
              <h2 className="mt-2 text-2xl font-black text-desert-900">{user.name}</h2>
              <p className="mt-2 text-sm font-semibold text-desert-700">{user.email}</p>
            </div>
            <div className="rounded-lg bg-royal-50 p-3 text-royal-800">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-6 grid gap-4">
            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-desert-700">Atlas completion</span>
                <Badge color="blue">{completionPercentage}%</Badge>
              </div>
              <ProgressBar className="mt-3" value={completionPercentage} label="Atlas completion" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <AccountMiniStat icon={CalendarDays} label="Member since" value={formatDate(user.createdAt)} />
              <AccountMiniStat icon={KeyRound} label="Security" value="Password protected" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            Module health
          </p>
          <h2 className="mt-2 text-2xl font-black text-desert-900">Study coverage</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {moduleCompletion.map((module) => (
              <div key={module.module} className="rounded-lg bg-desert-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black capitalize text-desert-900">{module.module}</p>
                  <span className="text-sm font-black text-royal-800">{module.percentage}%</span>
                </div>
                <ProgressBar className="mt-3" value={module.percentage} label={`${module.module} completion`} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <AccountForm
          title="Change email"
          description="Confirm your password before moving the account to a new email."
          icon={Mail}
          button="Update email"
          submitting={submitting === "email"}
          onSubmit={(event) => {
            event.preventDefault();
            runAction("email", async () => {
              await updateEmail(emailForm);
              setEmailForm((current) => ({ ...current, password: "" }));
            });
          }}
        >
          <TextInput
            label="New email"
            type="email"
            value={emailForm.email}
            onChange={(value) => setEmailForm((current) => ({ ...current, email: value }))}
            autoComplete="email"
          />
          <TextInput
            label="Current password"
            type="password"
            value={emailForm.password}
            onChange={(value) => setEmailForm((current) => ({ ...current, password: value }))}
            autoComplete="current-password"
          />
        </AccountForm>

        <AccountForm
          title="Change password"
          description="Use at least 8 characters and keep it unique to RajAtlas."
          icon={KeyRound}
          button="Update password"
          submitting={submitting === "password"}
          onSubmit={(event) => {
            event.preventDefault();
            runAction("password", async () => {
              await updatePassword(passwordForm);
              setPasswordForm({ currentPassword: "", newPassword: "" });
            });
          }}
        >
          <TextInput
            label="Current password"
            type="password"
            value={passwordForm.currentPassword}
            onChange={(value) =>
              setPasswordForm((current) => ({ ...current, currentPassword: value }))
            }
            autoComplete="current-password"
          />
          <TextInput
            label="New password"
            type="password"
            value={passwordForm.newPassword}
            onChange={(value) =>
              setPasswordForm((current) => ({ ...current, newPassword: value }))
            }
            autoComplete="new-password"
          />
        </AccountForm>

        <AccountForm
          title="Delete account"
          description="This permanently removes the account and active sessions from the database."
          icon={AlertTriangle}
          button="Delete account"
          danger
          submitting={submitting === "delete"}
          onSubmit={(event) => {
            event.preventDefault();
            runAction("delete", async () => {
              await deleteAccount({ password: deletePassword });
              navigate("/");
            });
          }}
        >
          <TextInput
            label="Current password"
            type="password"
            value={deletePassword}
            onChange={setDeletePassword}
            autoComplete="current-password"
          />
          <div className="rounded-lg bg-maroon-50 p-3 text-sm font-semibold leading-6 text-maroon-900">
            Deleting cannot be undone.
          </div>
        </AccountForm>
      </div>
    </div>
  );
}

function AccountMiniStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg bg-desert-50 p-4">
      <Icon className="h-5 w-5 text-royal-700" aria-hidden="true" />
      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-desert-600">{label}</p>
      <p className="mt-1 font-black text-desert-900">{value}</p>
    </div>
  );
}

function AccountForm({
  title,
  description,
  icon: Icon,
  button,
  danger = false,
  submitting,
  onSubmit,
  children,
}) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-desert-900">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-desert-700">{description}</p>
        </div>
        <div className={danger ? "rounded-lg bg-maroon-50 p-3 text-maroon-800" : "rounded-lg bg-royal-50 p-3 text-royal-800"}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      <form className="mt-5 grid gap-4" onSubmit={onSubmit}>
        {children}
        <Button
          type="submit"
          variant={danger ? "danger" : "primary"}
          icon={danger ? Trash2 : ShieldCheck}
          disabled={submitting}
        >
          {submitting ? "Saving..." : button}
        </Button>
      </form>
    </Card>
  );
}

function TextInput({ label, value, onChange, type = "text", autoComplete }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-desert-700">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-lg border border-desert-200 bg-white px-3 text-sm font-semibold text-desert-900 outline-none focus:border-royal-400 focus:ring-4 focus:ring-royal-100"
        autoComplete={autoComplete}
        required
      />
    </label>
  );
}

function formatDate(value) {
  if (!value) return "Today";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
