import { useLanguage } from '../i18n';

const LANGUAGES = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'da', flag: '🇩🇰', label: 'Dansk' },
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
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-sm font-bold transition-all duration-200 min-h-[36px]"
            style={{
              background: active ? '#2DD4BF' : '#1E293B',
              color: active ? '#0F172A' : '#64748b',
              border: `1.5px solid ${active ? '#2DD4BF' : '#334155'}`,
            }}
          >
            <span className="text-base leading-none">{flag}</span>
            <span className="text-xs uppercase tracking-wide">{code}</span>
          </button>
        );
      })}
    </div>
  );
}
