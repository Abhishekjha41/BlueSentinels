import { createContext, useContext, useMemo, useState, ReactNode } from "react";

type SupportedLanguage = "en" | "hi" | "ta" | "bn" | "te";

interface I18nContextValue {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const translations: Record<SupportedLanguage, Record<string, string>> = {
  en: {
  app_title: "BlueSentinels",
    app_tagline: "Coastal Hazard Monitor",
    citizen_portal: "Citizen Portal",
    official_portal: "Emergency Officials",
    system_active: "System Active",
    monitoring_247: "24/7 Monitoring",
    live_updates: "Live Updates",
    logout: "Logout",
  },
  hi: {
    app_title: "ओशनवॉच",
    app_tagline: "तटीय खतरों की निगरानी",
    citizen_portal: "नागरिक पोर्टल",
    official_portal: "आपातकालीन अधिकारी",
    system_active: "प्रणाली सक्रिय",
    monitoring_247: "24/7 निगरानी",
    live_updates: "लाइव अपडेट",
    logout: "लॉगआउट",
  },
  ta: {
    app_title: "ஓஷன்வாட்ச்",
    app_tagline: "கரையோர அபாய கண்காணிப்பு",
    citizen_portal: "பொதுமக்கள் தளம்",
    official_portal: "அதிகாரிகள்",
    system_active: "அமைப்பு செயல்பாட்டில்",
    monitoring_247: "24/7 கண்காணிப்பு",
    live_updates: "நேரடி புதுப்பிப்புகள்",
    logout: "வெளியேறு",
  },
  bn: {
    app_title: "ওশানওয়াচ",
    app_tagline: "উপকূলীয় ঝুঁকি নজরদারি",
    citizen_portal: "নাগরিক পোর্টাল",
    official_portal: "জরুরি কর্মকর্তা",
    system_active: "সিস্টেম সক্রিয়",
    monitoring_247: "২৪/৭ পর্যবেক্ষণ",
    live_updates: "লাইভ আপডেট",
    logout: "লগআউট",
  },
  te: {
    app_title: "ఓషన్‌వాచ్",
    app_tagline: "తీర ప్రాంత ప్రమాదాల పర్యవేక్షణ",
    citizen_portal: "పౌరుల పోర్టల్",
    official_portal: "అధికారులు",
    system_active: "సిస్టమ్ యాక్టివ్",
    monitoring_247: "24/7 మానిటరింగ్",
    live_updates: "లైవ్ అప్‌డేట్స్",
    logout: "లాగౌట్",
  },
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem("ow_lang") as SupportedLanguage | null;
    return saved ?? "en";
  });

  const value = useMemo<I18nContextValue>(() => {
    const table = translations[language] ?? translations.en;
    const t = (key: string) => table[key] ?? key;
    const setLang = (lang: SupportedLanguage) => {
      localStorage.setItem("ow_lang", lang);
      setLanguage(lang);
    };
    return { language, setLanguage: setLang, t };
  }, [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};


