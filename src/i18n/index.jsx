import { createContext, useContext, useState, useCallback } from 'react';
import en from './en';
import da from './da';
import de from './de';

const LOCALES = { en, da, de };

// ─── Context ─────────────────────────────────────────────────────────────────
const LanguageContext = createContext({ language: 'en', setLanguage: () => {} });

// ─── Provider ────────────────────────────────────────────────────────────────
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Persist preference in localStorage
    return localStorage.getItem('linelab-lang') || 'en';
  });

  const handleSetLanguage = useCallback((lang) => {
    localStorage.setItem('linelab-lang', lang);
    setLanguage(lang);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ─── Hooks ───────────────────────────────────────────────────────────────────
export function useLanguage() {
  return useContext(LanguageContext);
}

/**
 * useTranslation()
 * Returns t(key, vars?) — dot-notation key lookup with {placeholder} interpolation.
 * Falls back to the key string if not found.
 */
export function useTranslation() {
  const { language } = useLanguage();

  const t = useCallback(
    (key, vars = {}) => {
      const dict = LOCALES[language] ?? en;
      const value = key.split('.').reduce((obj, k) => obj?.[k], dict);
      if (value === undefined) {
        // Fallback to English
        const fallback = key.split('.').reduce((obj, k) => obj?.[k], en);
        if (fallback === undefined) return key;
        return interpolate(String(fallback), vars);
      }
      return interpolate(String(value), vars);
    },
    [language]
  );

  return { t, language };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function interpolate(str, vars) {
  return str.replace(/\{(\w+)\}/g, (_, key) => (vars[key] !== undefined ? vars[key] : `{${key}}`));
}
