import { introFacts } from "../data/introFacts";
import {
  census2011,
  geographyQuiz,
  hillsAndMountains,
  irrigationProjects,
  physicalFeatures,
  tribes,
  wildlifeAreas,
} from "../data/geography";
import { lakes } from "../data/lakes";
import { rivers } from "../data/rivers";
import { soils } from "../data/soil";
import { economyLayers, economyQuiz } from "../data/economy";
import { politicsTopics, politicsQuiz } from "../data/politics";
import { historyEvents, historyQuiz, medievalKingdoms, movementCards } from "../data/history";
import { cultureTopics, cultureQuiz } from "../data/culture";

const uniqueIds = (items) => [...new Set(items.filter(Boolean))];

export const MODULE_TOPIC_IDS = {
  introduction: introFacts.map((fact) => fact.id),
  geography: uniqueIds([
    ...physicalFeatures.map((item) => item.id),
    ...hillsAndMountains.map((item) => item.id),
    ...rivers.map((item) => item.id),
    ...lakes.map((item) => item.id),
    ...soils.map((item) => item.id),
    ...wildlifeAreas.map((item) => item.id),
    ...irrigationProjects.map((item) => item.id),
    ...tribes.map((item) => item.id),
    ...census2011.map((item) => `census-${item.metric}`),
    ...geographyQuiz.map((item) => item.id),
  ]),
  economy: uniqueIds([
    ...Object.values(economyLayers).flat().map((item) => item.id),
    ...economyQuiz.map((item) => item.id),
  ]),
  politics: uniqueIds([
    ...politicsTopics.map((item) => item.id),
    ...politicsQuiz.map((item) => item.id),
  ]),
  history: uniqueIds([
    ...historyEvents.map((item) => item.id),
    ...medievalKingdoms.map((item) => item.id),
    ...movementCards.map((item) => item.id),
    ...historyQuiz.map((item) => item.id),
  ]),
  culture: uniqueIds([
    ...cultureTopics.map((item) => item.id),
    ...cultureQuiz.map((item) => item.id),
  ]),
};

export const MODULE_WEIGHTS = Object.fromEntries(
  Object.entries(MODULE_TOPIC_IDS).map(([module, ids]) => [module, ids.length]),
);

export function calculateCompletion(completedTopics = []) {
  const allTopicIds = Object.values(MODULE_TOPIC_IDS).flat();
  const uniqueCompleted = new Set(completedTopics);
  const completedKnownTopics = allTopicIds.filter((id) => uniqueCompleted.has(id));
  const totalTopics = allTopicIds.length || 1;

  return Math.min(100, Math.round((completedKnownTopics.length / totalTopics) * 100));
}

export function getModuleCompletion(completedTopics = []) {
  const uniqueCompleted = new Set(completedTopics);

  return Object.entries(MODULE_TOPIC_IDS).map(([module, ids]) => {
    const completed = ids.filter((id) => uniqueCompleted.has(id)).length;
    return {
      module,
      completed,
      total: ids.length,
      percentage: ids.length ? Math.round((completed / ids.length) * 100) : 0,
    };
  });
}

export function getCategoryAverages(quizScores = []) {
  const grouped = quizScores.reduce((acc, score) => {
    if (!score.category) return acc;
    if (!acc[score.category]) {
      acc[score.category] = { total: 0, count: 0 };
    }
    acc[score.category].total += score.percentage || 0;
    acc[score.category].count += 1;
    return acc;
  }, {});

  return Object.entries(grouped).map(([category, value]) => ({
    category,
    average: Math.round(value.total / value.count),
  }));
}

export function getStrongAndWeakAreas(quizScores = []) {
  const averages = getCategoryAverages(quizScores);
  const sorted = [...averages].sort((a, b) => b.average - a.average);

  return {
    strongAreas: sorted.filter((item) => item.average >= 70).slice(0, 3),
    weakAreas: sorted.filter((item) => item.average < 70).slice(-3),
  };
}
