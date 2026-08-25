"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations } from "@/app/lib/i18n/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  translateCategory: (category?: string) => string;
  translateCondition: (condition?: string) => string;
  translateSpecLabel: (label: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "tpd_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY) as Language;
      if (savedLang === "en" || savedLang === "es") {
        setLanguageState(savedLang);
      }
    } catch {
      // Ignore localStorage errors
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore localStorage errors
    }
  };

  const t = translations[language] || translations.en;

  const translateCategory = (category?: string): string => {
    if (!category) return "";
    const categoryMap = t.categories as Record<string, string>;
    return categoryMap[category] || category;
  };

  const translateCondition = (condition?: string): string => {
    if (!condition) return "";
    const conditionMap = t.conditions as Record<string, string>;
    return conditionMap[condition] || condition;
  };

  const translateSpecLabel = (label: string): string => {
    const specsMap = t.specsLabels as Record<string, string>;
    return specsMap[label] || label;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        translateCategory,
        translateCondition,
        translateSpecLabel,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
