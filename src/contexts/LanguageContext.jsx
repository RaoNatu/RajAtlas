import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext(null);

const dictionary = {
  en: {
    home: "Home",
    map: "Map",
    regions: "Regions",
    quiz: "Quiz",
    progress: "Progress",
    learn: "Learn",
    geography: "Geography",
    economy: "Economy",
    politics: "Politics",
    history: "History",
    culture: "Culture",
    login: "Log in",
    register: "Register",
    dashboard: "Dashboard",
    brandSubline: "Rajasthan GK Atlas",
    heroBadge: "Rajasthan GK companion",
    heroTitle: "RajAtlas",
    heroCopy:
      "Simple maps, clear notes, quizzes, and revision tools for learning Rajasthan GK one topic at a time.",
    exploreMap: "Explore Map",
    startQuiz: "Start Quiz",
    viewProgress: "View Progress",
    revisionLab: "Revision Lab",
    createAccount: "Create Account",
    currentDistricts: "Current districts",
    regionsCount: "Regions",
    learningCards: "Learning cards",
    madeBy: "Made with love by Natu",
    github: "GitHub: RaoNatu",
    footerCopy:
      "Rajasthan GK maps, quizzes, revision tools, and account dashboard for focused preparation.",
    language: "Language",
    quizArenaTitle: "Quiz Arena",
    quizArenaDescription:
      "Practice Rajasthan Introduction with MCQs, true or false, matching, region-to-district, and district info questions.",
    quizArenaBadge: "Practice",
    quizSetup: "Quiz setup",
    quizCategory: "Category",
    quizMode: "Mode",
    matchSet: "Match set",
    scoreTracking: "Score tracking",
    scoreTrackingCopy:
      "Completed quizzes update your Progress page and Revision Lab analytics.",
    practiceControls: "Practice controls",
    practiceControlsCopy:
      "Restart the current drill instantly or switch categories from the setup panel.",
    retakeCurrentSet: "Retake current set",
    noQuestionsTitle: "No questions available",
    noQuestionsDescription: "Choose another category or switch to a different quiz mode.",
    noMatchTitle: "No matching quiz in this category",
    noMatchDescription: "Choose another category or switch to a different quiz mode.",
    correct: "Correct",
    reviewThis: "Review this",
    checkAnswer: "Check answer",
    seeResult: "See result",
    nextQuestion: "Next question",
    quizComplete: "Quiz complete",
    quizResult: "Quiz result",
    scoredOutOf: "You scored {score} out of {total}.",
    restartQuiz: "Restart quiz",
    chooseMatch: "Choose match",
    pairs: "{total} pairs",
    score: "Score: {score} / {total}",
    matchAccuracy: "Match accuracy",
    restartMatch: "Restart match",
    checkMatches: "Check matches",
    checkPartialMatches: "Check partial matches",
    mapPractice: "Map Practice",
    districtMapQuiz: "District map quiz",
    mapQuizComplete: "Map quiz complete",
    mapAccuracy: "Map accuracy",
    restartMapQuiz: "Restart map quiz",
    mapQuizInstruction:
      "Click the district shape directly on the map. Correct answers turn green, and incorrect selections turn red.",
    reviewThisDistrict: "Review this district",
    scoreSaved: "Score saved",
    nextDistrict: "Next district",
    scoreExcellent: "Excellent",
    scoreStrong: "Strong",
    scoreBuilding: "Building",
    scoreNeedsRevision: "Needs revision",
    "category.All": "All",
    "category.Rajasthan Introduction": "Rajasthan Introduction",
    "category.Regions": "Regions",
    "category.District Facts": "District Facts",
    "category.Boundaries": "Boundaries",
    "category.Symbols": "Symbols",
    "category.Map Practice": "Map Practice",
    "category.Geography": "Geography",
    "category.Economy": "Economy",
    "category.Politics": "Politics",
    "category.History": "History",
    "category.Culture": "Culture",
    "mode.single": "MCQ and district info",
    "mode.truefalse": "True / False",
    "mode.match": "Match",
    "mode.map": "District map",
    "type.mcq": "MCQ",
    "type.truefalse": "True / False",
    "type.region-to-district": "Region to district",
    "type.district-info": "District info",
    "type.match": "Match",
  },
  hi: {
    home: "होम",
    map: "मानचित्र",
    regions: "क्षेत्र",
    quiz: "क्विज",
    progress: "प्रगति",
    learn: "अभ्यास",
    geography: "भूगोल",
    economy: "अर्थव्यवस्था",
    politics: "राजव्यवस्था",
    history: "इतिहास",
    culture: "संस्कृति",
    login: "लॉग इन",
    register: "रजिस्टर",
    dashboard: "डैशबोर्ड",
    brandSubline: "राजस्थान GK एटलस",
    heroBadge: "राजस्थान GK साथी",
    heroTitle: "राजएटलस",
    heroCopy:
      "राजस्थान GK सीखने के लिए सरल मानचित्र, साफ नोट्स, क्विज और रिवीजन टूल.",
    exploreMap: "मानचित्र देखें",
    startQuiz: "क्विज शुरू करें",
    viewProgress: "प्रगति देखें",
    revisionLab: "रिवीजन लैब",
    createAccount: "खाता बनाएं",
    currentDistricts: "वर्तमान जिले",
    regionsCount: "क्षेत्र",
    learningCards: "लर्निंग कार्ड",
    madeBy: "नातू द्वारा प्रेम से बनाया गया",
    github: "GitHub: RaoNatu",
    footerCopy:
      "राजस्थान GK के लिए मानचित्र, क्विज, रिवीजन टूल और अकाउंट डैशबोर्ड.",
    language: "भाषा",
    quizArenaTitle: "क्विज क्षेत्र",
    quizArenaDescription:
      "राजस्थान परिचय, सत्य/असत्य, मिलान, क्षेत्र-जिला और जिला-जानकारी प्रश्नों का अभ्यास करें.",
    quizArenaBadge: "अभ्यास",
    quizSetup: "क्विज सेटअप",
    quizCategory: "श्रेणी",
    quizMode: "मोड",
    matchSet: "मिलान सेट",
    scoreTracking: "स्कोर ट्रैकिंग",
    scoreTrackingCopy:
      "पूरा किए गए क्विज आपकी प्रगति और रिवीजन लैब विश्लेषण को अपडेट करते हैं.",
    practiceControls: "अभ्यास नियंत्रण",
    practiceControlsCopy:
      "मौजूदा अभ्यास को तुरंत फिर से शुरू करें या सेटअप पैनल से श्रेणी बदलें.",
    retakeCurrentSet: "मौजूदा सेट दोहराएं",
    noQuestionsTitle: "कोई प्रश्न उपलब्ध नहीं",
    noQuestionsDescription: "दूसरी श्रेणी चुनें या अलग क्विज मोड पर जाएं.",
    noMatchTitle: "इस श्रेणी में मिलान क्विज नहीं है",
    noMatchDescription: "दूसरी श्रेणी चुनें या अलग क्विज मोड पर जाएं.",
    correct: "सही",
    reviewThis: "इसे दोहराएं",
    checkAnswer: "उत्तर जांचें",
    seeResult: "परिणाम देखें",
    nextQuestion: "अगला प्रश्न",
    quizComplete: "क्विज पूरा हुआ",
    quizResult: "क्विज परिणाम",
    scoredOutOf: "आपने {total} में से {score} अंक प्राप्त किए.",
    restartQuiz: "क्विज फिर शुरू करें",
    chooseMatch: "मिलान चुनें",
    pairs: "{total} जोड़े",
    score: "स्कोर: {score} / {total}",
    matchAccuracy: "मिलान सटीकता",
    restartMatch: "मिलान फिर शुरू करें",
    checkMatches: "मिलान जांचें",
    checkPartialMatches: "आंशिक मिलान जांचें",
    mapPractice: "मानचित्र अभ्यास",
    districtMapQuiz: "जिला मानचित्र क्विज",
    mapQuizComplete: "मानचित्र क्विज पूरा हुआ",
    mapAccuracy: "मानचित्र सटीकता",
    restartMapQuiz: "मानचित्र क्विज फिर शुरू करें",
    mapQuizInstruction:
      "मानचित्र पर सीधे जिले की आकृति पर क्लिक करें. सही उत्तर हरे और गलत चयन लाल दिखेंगे.",
    reviewThisDistrict: "इस जिले को दोहराएं",
    scoreSaved: "स्कोर सेव हुआ",
    nextDistrict: "अगला जिला",
    scoreExcellent: "उत्कृष्ट",
    scoreStrong: "मजबूत",
    scoreBuilding: "बन रहा है",
    scoreNeedsRevision: "रिवीजन चाहिए",
    "category.All": "सभी",
    "category.Rajasthan Introduction": "राजस्थान परिचय",
    "category.Regions": "क्षेत्र",
    "category.District Facts": "जिला तथ्य",
    "category.Boundaries": "सीमाएं",
    "category.Symbols": "प्रतीक",
    "category.Map Practice": "मानचित्र अभ्यास",
    "category.Geography": "भूगोल",
    "category.Economy": "अर्थव्यवस्था",
    "category.Politics": "राजव्यवस्था",
    "category.History": "इतिहास",
    "category.Culture": "संस्कृति",
    "mode.single": "MCQ और जिला जानकारी",
    "mode.truefalse": "सत्य / असत्य",
    "mode.match": "मिलान",
    "mode.map": "जिला मानचित्र",
    "type.mcq": "MCQ",
    "type.truefalse": "सत्य / असत्य",
    "type.region-to-district": "क्षेत्र से जिला",
    "type.district-info": "जिला जानकारी",
    "type.match": "मिलान",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem("rajatlas-language") || "en";
  });

  useEffect(() => {
    window.localStorage.setItem("rajatlas-language", language);
    document.documentElement.lang = language === "hi" ? "hi" : "en";
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((current) => (current === "en" ? "hi" : "en")),
      t: (key, variables) => formatText(dictionary[language]?.[key] || dictionary.en[key] || key, variables),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

function formatText(text, variables = {}) {
  return Object.entries(variables).reduce(
    (current, [key, value]) => current.replaceAll(`{${key}}`, String(value)),
    text,
  );
}
