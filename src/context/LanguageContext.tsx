"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "ne" | "en";

export interface Translations {
  // Navigation
  navHome: string;
  navQuestions: string;
  navExam: string;
  navPractice: string;
  navBookmarks: string;
  takeExamBtn: string;

  // Hero
  heroBadge: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  ctaExam: string;
  ctaPractice: string;
  ctaQuestions: string;
  syllabusPoint1: string;
  syllabusPoint2: string;
  syllabusPoint3: string;
  syllabusPoint4: string;

  // Quick Action Cards
  cardExamTitle: string;
  cardExamDesc: string;
  cardPracticeTitle: string;
  cardPracticeDesc: string;
  cardQuestionsTitle: string;
  cardQuestionsDesc: string;
  cardSignsTitle: string;
  cardSignsDesc: string;

  // Dashboard Stats
  dashboardTitle: string;
  dashboardSubtitle: string;
  totalQuestions: string;
  practicedQuestions: string;
  accuracy: string;
  mockExams: string;
  categoriesCount: string;
  passingBenchmark: string;

  // Practice Mode
  practiceTitle: string;
  practiceSubtitle: string;
  newRandomSet: string;
  setSizeLabel: string;
  categoryLabel: string;
  statusLabel: string;
  allCategories: string;
  allStatus: string;
  unansweredOnly: string;
  mistakesOnly: string;
  bookmarkedOnly: string;
  previousBtn: string;
  nextBtn: string;
  submitAnswerBtn: string;
  retryBtn: string;
  correctFeedback: string;
  incorrectFeedback: string;
  explanationLabel: string;
  questionNumberLabel: string;
  setCompleteTitle: string;
  setCompletePass: string;
  setCompleteFail: string;
  nextSetBtn: string;

  // Exam Mode
  examTitle: string;
  examSubtitle: string;
  startExamBtn: string;
  abandonExamBtn: string;
  submitExamBtn: string;
  flagForLater: string;
  flagged: string;
  timeRemaining: string;
  answeredCount: string;
  unansweredCount: string;
  flaggedCount: string;
  examGrid: string;
  confirmSubmitTitle: string;
  confirmSubmitDesc: string;
  clearSelection: string;

  // Results
  resultsTitle: string;
  resultsPassed: string;
  resultsFailed: string;
  scoreLabel: string;
  reviewAll: string;
  reviewIncorrect: string;
  reviewCorrect: string;
  retakeExamBtn: string;
  backToDashboard: string;

  // Question Bank
  bankTitle: string;
  bankSubtitle: string;
  searchPlaceholder: string;
  showAllAnswers: string;
  hideAnswers: string;
  showAnswerBtn: string;
  officialAnswer: string;
}

const TRANSLATIONS: Record<Language, Translations> = {
  ne: {
    navHome: "गृहपृष्ठ",
    navQuestions: "प्रश्नोत्तर",
    navExam: "परीक्षा",
    navPractice: "अभ्यास",
    navBookmarks: "बुकमार्क",
    takeExamBtn: "नमुना परीक्षा",

    heroBadge: "नेपाल सरकार यातायात व्यवस्था विभाग (DOTM) वर्ग ‘क’ (A) र ‘ट’ (K)",
    heroTitle: "नेपाल ड्राइभिङ लाइसेन्स",
    heroTitleHighlight: "लिखित परीक्षा तयारी (Likhit Exam)",
    heroSubtitle: "यातायात व्यवस्था विभागको ५०० आधिकारिक प्रश्नहरूबाट वास्तविक परीक्षा जस्तै अनियमित (Randomized) २० प्रश्नहरूको अभ्यास, ३० मिनेटको अनलाइन नमुना परीक्षा र विषयगत प्रश्नोत्तर।",
    ctaExam: "वास्तविक नमुना परीक्षा (२० प्रश्न / ३० मिनेट)",
    ctaPractice: "अनियमित २० प्रश्न अभ्यास सेट",
    ctaQuestions: "५०० प्रश्न बैंक (All Q&A)",
    syllabusPoint1: "५०० आधिकारिक प्रश्नोत्तर",
    syllabusPoint2: "२० प्रश्नहरूको अनियमित छनोट",
    syllabusPoint3: "३० मिनेट परीक्षा / १० अङ्क उत्तीर्ण",
    syllabusPoint4: "१००% नि:शुल्क र अफलाइन चल्ने",

    cardExamTitle: "वास्तविक नमुना परीक्षा (Mock Exam)",
    cardExamDesc: "३० मिनेटको आधिकारिक ढाँचा, घडी गणना र तत्काल नतिजा विश्लेषण।",
    cardPracticeTitle: "अनियमित २० प्रश्न अभ्यास",
    cardPracticeDesc: "प्रत्येक पटक नयाँ २० प्रश्नहरूको अनियमित सेट हल गर्नुहोस् र तयारी तिखार्नुहोस्।",
    cardQuestionsTitle: "महत्त्वपूर्ण प्रश्नोत्तर (५०० Q&A)",
    cardQuestionsDesc: "विषयगत वर्गीकरण, खोजी र १-क्लिकमा उत्तर हेरेर पूर्ण अध्ययन गर्नुहोस्।",
    cardSignsTitle: "ट्राफिक सङ्केतहरू (Traffic Signs)",
    cardSignsDesc: "११० ट्राफिक चिह्न र सडक रेखाङ्कन सम्बन्धी सम्पूर्ण प्रश्नोत्तरहरू।",

    dashboardTitle: "प्रगति विवरण (Dashboard)",
    dashboardSubtitle: "तपाईंको अभ्यास, सही उत्तर र नमुना परीक्षाको अद्यावधिक स्थिति।",
    totalQuestions: "कुल प्रश्नहरू",
    practicedQuestions: "अभ्यास गरिएको",
    accuracy: "सटीकता (Accuracy)",
    mockExams: "नमुना परीक्षा",
    categoriesCount: "६ खण्डहरू",
    passingBenchmark: "५०% (१०/२०) उत्तीर्ण",

    practiceTitle: "अनियमित प्रश्न अभ्यास (Random Practice)",
    practiceSubtitle: "वास्तविक लिखित परीक्षा ढाँचामा आधारित अनियमित प्रश्न सेटहरू।",
    newRandomSet: "नयाँ प्रश्न सेट (New Set)",
    setSizeLabel: "प्रश्न संख्या (Set Size)",
    categoryLabel: "विषय छनोट (Category)",
    statusLabel: "अवस्था (Status)",
    allCategories: "सबै विषयहरू (६ खण्डहरू)",
    allStatus: "सबै प्रश्नहरू (All)",
    unansweredOnly: "नयाँ प्रश्नहरू (New)",
    mistakesOnly: "गलत भएका (Mistakes)",
    bookmarkedOnly: "सुरक्षित (Saved)",
    previousBtn: "अघिल्लो (Previous)",
    nextBtn: "पछिल्लो (Next)",
    submitAnswerBtn: "उत्तर बुझाउनुहोस् (Submit)",
    retryBtn: "पुनः प्रयास गर्नुहोस् (Retry)",
    correctFeedback: "बधाई छ! तपाईंको उत्तर सही छ।",
    incorrectFeedback: "गलत उत्तर!",
    explanationLabel: "थप व्याख्या (Explanation):",
    questionNumberLabel: "प्रश्न",
    setCompleteTitle: "सेट सम्पन्न भयो",
    setCompletePass: "बधाई छ! तपाईं यस सेटमा उत्तीर्ण हुनुभयो।",
    setCompleteFail: "यस सेटमा थप अभ्यास आवश्यक छ।",
    nextSetBtn: "अर्को नयाँ सेट सुरु गर्नुहोस्",

    examTitle: "ड्राइभिङ लाइसेन्स नमुना परीक्षा (Mock Exam)",
    examSubtitle: "यातायात व्यवस्था विभागको आधिकारिक वर्ग ‘क’ र ‘ट’ लिखित परीक्षाको कम्प्युटर सिमुलेसन।",
    startExamBtn: "परीक्षा सुरु गर्नुहोस् (Start Exam)",
    abandonExamBtn: "परीक्षा रद्द गर्नुहोस्",
    submitExamBtn: "परीक्षा बुझाउनुहोस् (Submit Exam)",
    flagForLater: "पछि हेर्न Flag गर्नुहोस्",
    flagged: "Flag गरिएको",
    timeRemaining: "बाँकी समय",
    answeredCount: "हल गरिएका",
    unansweredCount: "बाँकी प्रश्न",
    flaggedCount: "Flag गरिएका",
    examGrid: "प्रश्न नेभिगेटर (Palette)",
    confirmSubmitTitle: "परीक्षा बुझाउने निश्चित गर्नुहुन्छ?",
    confirmSubmitDesc: "कृपया अन्तिम मूल्याङ्कन अघि आफ्नो प्रगति समीक्षा गर्नुहोस्।",
    clearSelection: "छनोट हटाउनुहोस्",

    resultsTitle: "परीक्षा नतिजा (Exam Results)",
    resultsPassed: "बधाई छ! तपाईं लिखित परीक्षामा उत्तीर्ण हुनुभयो।",
    resultsFailed: "यस पटक अनुत्तीर्ण हुनुभयो। थप अभ्यास गर्नुहोस्।",
    scoreLabel: "प्राप्ताङ्क (Score)",
    reviewAll: "सबै प्रश्नहरू",
    reviewIncorrect: "गलत मात्र",
    reviewCorrect: "सही मात्र",
    retakeExamBtn: "पुनः परीक्षा दिनुहोस्",
    backToDashboard: "गृहपृष्ठमा फर्कनुहोस्",

    bankTitle: "महत्त्वपूर्ण प्रश्नोत्तर (Important Q&A)",
    bankSubtitle: "यातायात व्यवस्था विभागको ५०० आधिकारिक प्रश्नोत्तरहरू अध्ययन गर्नुहोस्।",
    searchPlaceholder: "नेपाली वा अंग्रेजीमा खोज्नुहोस् (उदा. जेब्रा क्रस, बत्ती, helmet...)",
    showAllAnswers: "सबै उत्तर देखाउनुहोस्",
    hideAnswers: "उत्तर लुकाउनुहोस्",
    showAnswerBtn: "उत्तर हेर्नुहोस् (Show Answer)",
    officialAnswer: "आधिकारिक सही उत्तर:",
  },
  en: {
    navHome: "Home",
    navQuestions: "Questions",
    navExam: "Mock Exam",
    navPractice: "Practice",
    navBookmarks: "Bookmarks",
    takeExamBtn: "Mock Exam",

    heroBadge: "Government of Nepal DOTM License Exam (Category A & K)",
    heroTitle: "Nepal Driving License",
    heroTitleHighlight: "Written Exam Prep (Likhit)",
    heroSubtitle: "Practice randomized 20-question sets from the official 500-question DOTM syllabus, take real-time 30-minute timed mock tests, and master all written driving exam topics.",
    ctaExam: "Real Mock Exam (20 Qs / 30 Mins)",
    ctaPractice: "Random 20 Qs Practice Set",
    ctaQuestions: "500 Question Bank (All Q&A)",
    syllabusPoint1: "500 Official Questions & Answers",
    syllabusPoint2: "Randomized 20 Question Selection",
    syllabusPoint3: "30-Min Exam / 10 Marks to Pass",
    syllabusPoint4: "100% Free & Works Offline",

    cardExamTitle: "Simulated Mock Exam",
    cardExamDesc: "Realistic 30-minute exam countdown with instant grading and pass/fail analytics.",
    cardPracticeTitle: "Random 20 Qs Practice",
    cardPracticeDesc: "Practice fresh randomized 20-question sets every time to build exam mastery.",
    cardQuestionsTitle: "Important Questions (500 Q&A)",
    cardQuestionsDesc: "Searchable category library with 1-click answer revelation and instant review.",
    cardSignsTitle: "Traffic Signs & Signals",
    cardSignsDesc: "110 visual road signs, pavement markings, and traffic regulations questions.",

    dashboardTitle: "Learning Dashboard",
    dashboardSubtitle: "Your latest accuracy, practice progress, and examination history.",
    totalQuestions: "Total Bank",
    practicedQuestions: "Practiced",
    accuracy: "Accuracy",
    mockExams: "Mock Exams",
    categoriesCount: "6 Sections",
    passingBenchmark: "50% (10/20) Pass Mark",

    practiceTitle: "Random Practice Drill",
    practiceSubtitle: "Exam-pattern randomized questions drawn unpredictable from the syllabus.",
    newRandomSet: "New Random Set",
    setSizeLabel: "Set Size",
    categoryLabel: "Category Filter",
    statusLabel: "Status Filter",
    allCategories: "All 6 Categories",
    allStatus: "All Questions",
    unansweredOnly: "New Questions",
    mistakesOnly: "Mistakes Only",
    bookmarkedOnly: "Saved Questions",
    previousBtn: "Previous",
    nextBtn: "Next",
    submitAnswerBtn: "Submit Answer",
    retryBtn: "Retry Question",
    correctFeedback: "Correct! Outstanding job.",
    incorrectFeedback: "Incorrect answer!",
    explanationLabel: "Explanation & Source Note:",
    questionNumberLabel: "Question",
    setCompleteTitle: "Practice Set Completed",
    setCompletePass: "Congratulations! You passed this practice set.",
    setCompleteFail: "Review your mistakes and take another practice set.",
    nextSetBtn: "Start Next Random Set",

    examTitle: "Online Mock Examination",
    examSubtitle: "Official Nepal DOTM Category A (Motorcycle) & K (Scooter) computer-based test simulation.",
    startExamBtn: "Start Examination",
    abandonExamBtn: "Abandon Exam",
    submitExamBtn: "Submit Examination",
    flagForLater: "Flag for Later",
    flagged: "Flagged",
    timeRemaining: "Time Remaining",
    answeredCount: "Answered",
    unansweredCount: "Unanswered",
    flaggedCount: "Flagged",
    examGrid: "Question Navigator",
    confirmSubmitTitle: "Submit Examination?",
    confirmSubmitDesc: "Review your unanswered and flagged questions before final evaluation.",
    clearSelection: "Clear selection",

    resultsTitle: "Examination Report",
    resultsPassed: "Congratulations! You have passed the examination.",
    resultsFailed: "You did not achieve the required pass mark. Review mistakes below.",
    scoreLabel: "Final Score",
    reviewAll: "All Questions",
    reviewIncorrect: "Mistakes Only",
    reviewCorrect: "Correct Only",
    retakeExamBtn: "Retake Mock Exam",
    backToDashboard: "Return to Dashboard",

    bankTitle: "Important Questions Bank",
    bankSubtitle: "Browse all 500 official DOTM written test questions with answers.",
    searchPlaceholder: "Search in English or Nepali (e.g. zebra cross, helmet, speed, signal...)",
    showAllAnswers: "Show All Answers",
    hideAnswers: "Hide All Answers",
    showAnswerBtn: "Show Answer",
    officialAnswer: "Official Correct Answer:",
  },
};

const CATEGORY_TRANSLATIONS: Record<string, { en: string; ne: string }> = {
  "सवारी सञ्चालन सम्बन्धी ज्ञान": {
    ne: "सवारी सञ्चालन सम्बन्धी ज्ञान",
    en: "Vehicle Operation Knowledge",
  },
  "सवारी ऐन नियमसम्बन्धी ज्ञान": {
    ne: "सवारी ऐन नियमसम्बन्धी ज्ञान",
    en: "Traffic Laws & Regulations",
  },
  "सवारी साधनको प्राविधिक तथा यान्त्रिक ज्ञान": {
    ne: "सवारी साधनको प्राविधिक तथा यान्त्रिक ज्ञान",
    en: "Mechanical & Technical Knowledge",
  },
  "वातावरण प्रदूषण सम्बन्धी अवधारणात्मक ज्ञान": {
    ne: "वातावरण प्रदूषण सम्बन्धी अवधारणात्मक ज्ञान",
    en: "Environmental Pollution Awareness",
  },
  "दुर्घटना सचेतना सम्बन्धी ज्ञान": {
    ne: "दुर्घटना सचेतना सम्बन्धी ज्ञान",
    en: "Accident Awareness & Safety",
  },
  "ट्राफिक सङ्केत सम्बन्धी ज्ञान": {
    ne: "ट्राफिक सङ्केत सम्बन्धी ज्ञान",
    en: "Traffic Signs & Road Markings",
  },
};

const KEY_TRANSLATIONS: Record<string, string> = {
  "क": "A",
  "ख": "B",
  "ग": "C",
  "घ": "D",
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  translateCategory: (catName: string) => string;
  translateKey: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "licenseprep_language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ne");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (saved === "ne" || saved === "en") {
        setLanguageState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "ne" ? "en" : "ne");
  };

  const translateCategory = (catName: string): string => {
    const item = CATEGORY_TRANSLATIONS[catName];
    if (!item) return catName;
    return language === "en" ? item.en : item.ne;
  };

  const translateKey = (key: string): string => {
    if (language === "en" && KEY_TRANSLATIONS[key]) {
      return KEY_TRANSLATIONS[key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: TRANSLATIONS[language],
        translateCategory,
        translateKey,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
