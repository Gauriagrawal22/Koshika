import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../i18n/en.json';
import hi from '../i18n/hi.json';
import mr from '../i18n/mr.json';

const LanguageContext = createContext();

export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' }
];

const TRANSLATIONS = {
  en,
  hi,
  mr
};

export const LanguageProvider = ({ children }) => {
  const [langCode, setLangCode] = useState(() => {
    try {
      const saved = localStorage.getItem('koshika_lang_code');
      if (saved && TRANSLATIONS[saved]) {
        return saved;
      }
      return 'en';
    } catch (e) {
      return 'en';
    }
  });

  const changeLanguage = (code) => {
    if (TRANSLATIONS[code]) {
      setLangCode(code);
      try {
        localStorage.setItem('koshika_lang_code', code);
      } catch (e) {}
    }
  };

  const currentLang = LANGUAGES.find((l) => l.code === langCode) || LANGUAGES[0];
  const t = { ...TRANSLATIONS.en, ...(TRANSLATIONS[langCode] || {}) };

  useEffect(() => {
    document.documentElement.lang = langCode;
  }, [langCode]);

  return (
    <LanguageContext.Provider value={{ langCode, currentLang, changeLanguage, t, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      langCode: 'en',
      currentLang: LANGUAGES[0],
      changeLanguage: () => {},
      t: TRANSLATIONS.en,
      languages: LANGUAGES
    };
  }
  return context;
};

export default LanguageContext;
