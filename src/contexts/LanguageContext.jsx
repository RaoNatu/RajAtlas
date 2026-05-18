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
    madeBy: "Made with love by Natu",
    github: "GitHub: RaoNatu",
    footerCopy:
      "राजस्थान GK के लिए मानचित्र, क्विज, रिवीजन टूल और अकाउंट डैशबोर्ड.",
    language: "भाषा",
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
      t: (key) => dictionary[language]?.[key] || dictionary.en[key] || key,
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
