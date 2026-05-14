import { useCallback } from "react";
import { calculateCompletion, getStrongAndWeakAreas } from "../utils/calculateProgress";
import { useLocalStorage } from "./useLocalStorage";

const defaultProgress = {
  completedTopics: [],
  quizScores: [],
  lastOpenedModule: "Introduction",
  recentlyStudied: [],
  badges: [],
  bookmarks: [],
  flashcardReviews: [],
  dailyChallengeCompletions: [],
  mistakes: [],
  xp: 0,
  streak: 0,
  lastStudyDate: "",
};

export function useProgress() {
  const [progress, setProgress] = useLocalStorage("rajasthan-atlas-progress", defaultProgress);

  const safeProgress = { ...defaultProgress, ...progress };
  const completionPercentage = calculateCompletion(safeProgress.completedTopics);
  const { strongAreas, weakAreas } = getStrongAndWeakAreas(safeProgress.quizScores);
  const level = Math.floor((safeProgress.xp || 0) / 100) + 1;

  const markTopicComplete = useCallback((topicId, topicTitle, moduleName = "Study") => {
    setProgress((current) => {
      const completedTopics = new Set(current.completedTopics || []);
      const alreadyCompleted = completedTopics.has(topicId);
      completedTopics.add(topicId);

      const recentTopic = {
        id: topicId,
        title: topicTitle,
        module: moduleName,
        studiedAt: new Date().toISOString(),
      };

      const streakPatch = buildStreakPatch(current);
      const nextBadges = buildBadges({
        percentage: 0,
        currentBadges: current.badges || [],
        bookmarkCount: current.bookmarks?.length || 0,
        flashcardCount: current.flashcardReviews?.length || 0,
        completedCount: completedTopics.size,
      });

      return {
        ...defaultProgress,
        ...current,
        ...streakPatch,
        xp: (current.xp || 0) + (alreadyCompleted ? 2 : 10),
        badges: nextBadges,
        completedTopics: Array.from(completedTopics),
        recentlyStudied: [recentTopic, ...(current.recentlyStudied || [])].slice(0, 10),
      };
    });
  }, [setProgress]);

  const recordQuizScore = useCallback(({ id, category, score, total }) => {
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

    setProgress((current) => {
      const streakPatch = buildStreakPatch(current);
      const mistakes =
        score < total
          ? [
              {
                id: `${id}-${Date.now()}`,
                category,
                missed: total - score,
                total,
                attemptedAt: new Date().toISOString(),
              },
              ...(current.mistakes || []),
            ].slice(0, 20)
          : current.mistakes || [];

      return {
        ...defaultProgress,
        ...current,
        ...streakPatch,
        xp: (current.xp || 0) + Math.max(5, percentage),
        quizScores: [
          {
            id,
            category,
            score,
            total,
            percentage,
            attemptedAt: new Date().toISOString(),
          },
          ...(current.quizScores || []),
        ].slice(0, 30),
        mistakes,
        badges: buildBadges({
          percentage,
          currentBadges: current.badges || [],
          bookmarkCount: current.bookmarks?.length || 0,
          flashcardCount: current.flashcardReviews?.length || 0,
          completedCount: current.completedTopics?.length || 0,
        }),
      };
    });
  }, [setProgress]);

  const setLastOpenedModule = useCallback((moduleName) => {
    setProgress((current) => ({
      ...defaultProgress,
      ...current,
      lastOpenedModule: moduleName,
    }));
  }, [setProgress]);

  const toggleBookmark = useCallback((bookmark) => {
    setProgress((current) => {
      const bookmarks = current.bookmarks || [];
      const exists = bookmarks.some((item) => item.id === bookmark.id);
      const nextBookmarks = exists
        ? bookmarks.filter((item) => item.id !== bookmark.id)
        : [{ savedAt: new Date().toISOString(), ...bookmark }, ...bookmarks].slice(0, 60);

      return {
        ...defaultProgress,
        ...current,
        bookmarks: nextBookmarks,
        badges: buildBadges({
          percentage: 0,
          currentBadges: current.badges || [],
          bookmarkCount: nextBookmarks.length,
          flashcardCount: current.flashcardReviews?.length || 0,
          completedCount: current.completedTopics?.length || 0,
        }),
      };
    });
  }, [setProgress]);

  const isBookmarked = useCallback(
    (bookmarkId) => (safeProgress.bookmarks || []).some((item) => item.id === bookmarkId),
    [safeProgress.bookmarks],
  );

  const recordFlashcardReview = useCallback((flashcardId, remembered = true) => {
    setProgress((current) => {
      const review = {
        id: flashcardId,
        remembered,
        reviewedAt: new Date().toISOString(),
      };
      const nextReviews = [review, ...(current.flashcardReviews || [])].slice(0, 80);
      const streakPatch = buildStreakPatch(current);

      return {
        ...defaultProgress,
        ...current,
        ...streakPatch,
        xp: (current.xp || 0) + (remembered ? 8 : 4),
        flashcardReviews: nextReviews,
        badges: buildBadges({
          percentage: 0,
          currentBadges: current.badges || [],
          bookmarkCount: current.bookmarks?.length || 0,
          flashcardCount: nextReviews.length,
          completedCount: current.completedTopics?.length || 0,
        }),
      };
    });
  }, [setProgress]);

  const completeDailyChallenge = useCallback((challenge) => {
    setProgress((current) => {
      const completions = current.dailyChallengeCompletions || [];
      const today = getDateKey();
      const alreadyCompleted = completions.some(
        (item) => item.id === challenge.id && item.date === today,
      );
      if (alreadyCompleted) return { ...defaultProgress, ...current };

      const streakPatch = buildStreakPatch(current);
      return {
        ...defaultProgress,
        ...current,
        ...streakPatch,
        xp: (current.xp || 0) + (challenge.rewardXp || 10),
        dailyChallengeCompletions: [
          { id: challenge.id, title: challenge.title, date: today },
          ...completions,
        ].slice(0, 30),
      };
    });
  }, [setProgress]);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
  }, [setProgress]);

  return {
    progress: safeProgress,
    completionPercentage,
    strongAreas,
    weakAreas,
    level,
    markTopicComplete,
    recordQuizScore,
    setLastOpenedModule,
    toggleBookmark,
    isBookmarked,
    recordFlashcardReview,
    completeDailyChallenge,
    resetProgress,
  };
}

function buildBadges({
  percentage,
  currentBadges,
  bookmarkCount,
  flashcardCount,
  completedCount,
}) {
  const badgeSet = new Set(currentBadges);
  if (completedCount > 0) badgeSet.add("Atlas Starter");
  if (percentage >= 80) badgeSet.add("Quiz Sprinter");
  if (percentage === 100) badgeSet.add("Perfect Recall");
  if (bookmarkCount >= 3) badgeSet.add("Bookmark Builder");
  if (flashcardCount >= 5) badgeSet.add("Revision Ready");
  return Array.from(badgeSet);
}

function buildStreakPatch(current) {
  const today = getDateKey();
  if (current.lastStudyDate === today) {
    return {
      streak: Math.max(1, current.streak || 1),
      lastStudyDate: today,
    };
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);

  return {
    streak: current.lastStudyDate === yesterdayKey ? (current.streak || 0) + 1 : 1,
    lastStudyDate: today,
  };
}

function getDateKey() {
  return new Date().toISOString().slice(0, 10);
}
