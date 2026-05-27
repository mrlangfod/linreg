import { useLanguage } from '../i18n';

const LANGUAGES = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'da', flag: '🇩🇰', label: 'Dansk'   },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch'  },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1" aria-label="Language switcher" role="group">
      {LANGUAGES.map(({ code, flag, label }) => {
        const active = language === code;
        return (
          <button
            key={code}
            onClick={() => setLanguage(code)}
            aria-label={`Switch to ${label}`}
            aria-pressed={active}
            title={label}
            className="flex items-center justify-center rounded-xl transition-all duration-200"
            style={{
              width: 40,
              height: 40,
              fontSize: '1.4rem',
              lineHeight: 1,
              background: active ? '#2DD4BF22' : 'transparent',
              border: `2px solid ${active ? '#2DD4BF' : 'transparent'}`,
              cursor: 'pointer',
            }}
          >
            {flag}
          </button>
        );
      })}
    </div>
  );
}
