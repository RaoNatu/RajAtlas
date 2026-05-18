import { useEffect, useMemo, useState } from "react";
import { Brain, ListChecks, Repeat2 } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import EmptyState from "../components/common/EmptyState";
import MCQQuiz from "../components/quiz/MCQQuiz";
import MatchQuiz from "../components/quiz/MatchQuiz";
import MapDistrictQuiz from "../components/quiz/MapDistrictQuiz";
import TrueFalseQuiz from "../components/quiz/TrueFalseQuiz";
import { matchQuizzes, quizCategories, quizzes } from "../data/quizzes";
import { useProgress } from "../hooks/useProgress";
import { filterQuizzesByCategory } from "../utils/quizHelpers";

const quizModes = [
  { id: "single", label: "MCQ and district info" },
  { id: "truefalse", label: "True / False" },
  { id: "match", label: "Match" },
  { id: "map", label: "District map" },
];

export default function QuizArena() {
  const [category, setCategory] = useState("All");
  const [mode, setMode] = useState("single");
  const [matchId, setMatchId] = useState(matchQuizzes[0].id);
  const [sessionKey, setSessionKey] = useState(0);
  const { recordQuizScore, setLastOpenedModule } = useProgress();

  useEffect(() => {
    setLastOpenedModule("Quiz Arena");
  }, [setLastOpenedModule]);

  const filteredSingleQuestions = useMemo(() => {
    const byCategory = filterQuizzesByCategory(quizzes, category);
    if (mode === "truefalse") {
      return byCategory.filter((quiz) => quiz.type === "truefalse");
    }
    return byCategory.filter((quiz) => quiz.type !== "truefalse");
  }, [category, mode]);

  const filteredMatchQuizzes = useMemo(() => {
    if (category === "All") return matchQuizzes;
    return matchQuizzes.filter((quiz) => quiz.category === category);
  }, [category]);

  const selectedMatchQuiz =
    filteredMatchQuizzes.find((quiz) => quiz.id === matchId) || filteredMatchQuizzes[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Quiz Arena"
        description="Practice Rajasthan Introduction with MCQs, true or false, matching, region-to-district, and district info questions."
        badge="Practice"
      />

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <Card className="h-fit p-5">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-royal-700" aria-hidden="true" />
            <h2 className="text-lg font-black text-desert-900">Quiz setup</h2>
          </div>

          <div className="mt-5">
            <label className="text-sm font-bold text-desert-700" htmlFor="quiz-category">
              Category
            </label>
            <select
              id="quiz-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-2 h-11 w-full rounded-lg border border-desert-200 bg-white px-3 text-sm font-semibold text-desert-900 outline-none focus:border-royal-400 focus:ring-4 focus:ring-royal-100"
            >
              {quizCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-5">
            <p className="text-sm font-bold text-desert-700">Mode</p>
            <div className="mt-2 grid gap-2">
              {quizModes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMode(item.id)}
                  className={[
                    "rounded-lg border px-3 py-3 text-left text-sm font-bold transition",
                    mode === item.id
                      ? "border-royal-300 bg-royal-50 text-royal-900"
                      : "border-desert-200 bg-white text-desert-800 hover:border-royal-200",
                  ].join(" ")}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {mode === "match" && filteredMatchQuizzes.length ? (
            <div className="mt-5">
              <label className="text-sm font-bold text-desert-700" htmlFor="match-quiz">
                Match set
              </label>
              <select
                id="match-quiz"
                value={selectedMatchQuiz?.id || ""}
                onChange={(event) => setMatchId(event.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-desert-200 bg-white px-3 text-sm font-semibold text-desert-900 outline-none focus:border-royal-400 focus:ring-4 focus:ring-royal-100"
              >
                {filteredMatchQuizzes.map((quiz) => (
                  <option key={quiz.id} value={quiz.id}>
                    {quiz.title}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <div className="mt-6 rounded-lg bg-desert-50 p-4">
            <div className="flex items-center gap-2 font-black text-desert-900">
              <ListChecks className="h-4 w-4 text-royal-700" aria-hidden="true" />
              Score tracking
            </div>
            <p className="mt-2 text-sm leading-6 text-desert-700">
              Completed quizzes update your Progress page and Revision Lab analytics.
            </p>
          </div>
        </Card>

        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <Badge color="blue">{category}</Badge>
            <Badge color="gold">{quizModes.find((item) => item.id === mode)?.label}</Badge>
          </div>

          {mode === "map" ? (
            <MapDistrictQuiz key={`map-${sessionKey}`} onComplete={recordQuizScore} />
          ) : mode === "match" ? (
            selectedMatchQuiz ? (
              <MatchQuiz
                key={`${category}-${selectedMatchQuiz.id}-${sessionKey}`}
                quiz={selectedMatchQuiz}
                onComplete={recordQuizScore}
              />
            ) : (
              <EmptyState
                title="No matching quiz in this category"
                description="Choose another category or switch to a different quiz mode."
              />
            )
          ) : filteredSingleQuestions.length ? (
            mode === "truefalse" ? (
              <TrueFalseQuiz
                key={`${category}-${mode}-${sessionKey}`}
                questions={filteredSingleQuestions}
                onComplete={recordQuizScore}
              />
            ) : (
              <MCQQuiz
                key={`${category}-${mode}-${sessionKey}`}
                questions={filteredSingleQuestions}
                quizId={`${category}-${mode}`}
                onComplete={recordQuizScore}
              />
            )
          ) : (
            <EmptyState
              title="No questions available"
              description="Choose another category or switch to a different quiz mode."
            />
          )}

          <Card className="p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-black text-desert-900">
                  Practice controls
                </h3>
                <p className="mt-1 text-sm leading-6 text-desert-700">
                  Restart the current drill instantly or switch categories from the setup panel.
                </p>
              </div>
              <Button
                variant="secondary"
                icon={Repeat2}
                onClick={() => setSessionKey((value) => value + 1)}
              >
                Retake current set
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
