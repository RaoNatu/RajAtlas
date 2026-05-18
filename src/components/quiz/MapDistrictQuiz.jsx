import { useEffect, useRef, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { districts } from "../../data/districts";
import { mapDistrictQuizzes } from "../../data/quizzes";
import Badge from "../common/Badge";
import Button from "../common/Button";
import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";
import SvgDistrictMap from "../map/SvgDistrictMap";
import { useLanguage } from "../../contexts/LanguageContext";

export default function MapDistrictQuiz({ questions = mapDistrictQuizzes, onComplete }) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [feedbackMap, setFeedbackMap] = useState({});
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const completedRef = useRef(false);

  const currentQuestion = questions[index];
  const currentAnswer = answers.find((answer) => answer.id === currentQuestion?.id);
  const score = answers.filter((answer) => answer.correct).length;
  const isComplete = answers.length === questions.length;
  const percentage = questions.length ? Math.round((score / questions.length) * 100) : 0;

  useEffect(() => {
    if (isComplete && !completedRef.current) {
      completedRef.current = true;
      onComplete?.({
        id: "district-map-quiz",
        category: "Map Practice",
        score,
        total: questions.length,
      });
    }
  }, [isComplete, onComplete, questions.length, score]);

  function chooseDistrict(district) {
    if (!currentQuestion || currentAnswer) return;

    const correct = district.id === currentQuestion.correctDistrictId;
    setSelectedDistrictId(district.id);
    setFeedbackMap({
      [district.id]: correct ? "correct" : "incorrect",
      [currentQuestion.correctDistrictId]: "correct",
    });
    setAnswers((current) => [
      ...current,
      {
        id: currentQuestion.id,
        selectedDistrictId: district.id,
        correct,
      },
    ]);
  }

  function nextQuestion() {
    if (index < questions.length - 1) {
      setIndex((value) => value + 1);
      setFeedbackMap({});
      setSelectedDistrictId("");
    }
  }

  function restart() {
    completedRef.current = false;
    setIndex(0);
    setAnswers([]);
    setFeedbackMap({});
    setSelectedDistrictId("");
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="grid gap-0 xl:grid-cols-[1fr_340px]">
        <SvgDistrictMap
          selectedDistrictId={selectedDistrictId}
          visibleDistricts={districts}
          feedbackMap={feedbackMap}
          onSelectDistrict={chooseDistrict}
          ariaLabel={t("districtMapQuiz")}
          className="rounded-none border-0 shadow-none"
        />

        <div className="border-t border-desert-200 bg-white p-6 xl:border-l xl:border-t-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge color="blue">{t("mapPractice")}</Badge>
            <Badge color="gold">
              {Math.min(index + 1, questions.length)} / {questions.length}
            </Badge>
          </div>

          {isComplete ? (
            <div className="mt-6">
              <h2 className="text-2xl font-black text-desert-900">{t("mapQuizComplete")}</h2>
              <p className="mt-2 text-sm font-semibold text-desert-700">
                {t("scoredOutOf", { score, total: questions.length })}
              </p>
              <ProgressBar className="mt-6" value={percentage} label={t("mapAccuracy")} />
              <Button className="mt-6" variant="secondary" icon={RotateCcw} onClick={restart}>
                {t("restartMapQuiz")}
              </Button>
            </div>
          ) : (
            <div className="mt-6">
              <h2 className="text-2xl font-black leading-tight text-desert-900">
                {currentQuestion.prompt}
              </h2>
              <p className="mt-3 text-sm leading-6 text-desert-700">
                {t("mapQuizInstruction")}
              </p>

              {currentAnswer ? (
                <div className="mt-5 rounded-lg bg-desert-50 p-4">
                  <p className="font-black text-desert-900">
                    {currentAnswer.correct ? t("correct") : t("reviewThisDistrict")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-desert-700">
                    {currentQuestion.explanation}
                  </p>
                  <Button
                    className="mt-4"
                    icon={ArrowRight}
                    onClick={nextQuestion}
                    disabled={index === questions.length - 1}
                  >
                    {index === questions.length - 1 ? t("scoreSaved") : t("nextDistrict")}
                  </Button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
