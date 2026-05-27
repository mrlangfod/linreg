import { motion } from 'framer-motion';
import { useTranslation } from '../i18n';

export default function ModeNav({ activeMode, onModeChange }) {
  const { t } = useTranslation();

  const MODES = [
    { id: 'explore',  emoji: '🔭', labelKey: 'nav.explore'   },
    { id: 'story',    emoji: '📖', labelKey: 'nav.stories'   },
    { id: 'pattern',  emoji: '🔢', labelKey: 'nav.patterns'  },
    { id: 'quiz',     emoji: '🕵️', labelKey: 'nav.detective' },
  ];

  return (
    <nav
      className="flex items-center gap-1 px-2 py-2 rounded-2xl"
      style={{ background: '#1E293B' }}
      aria-label="Navigation modes"
    >
      {MODES.map((mode) => {
        const isActive = activeMode === mode.id;
        return (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            aria-current={isActive ? 'page' : undefined}
            aria-label={t(mode.labelKey)}
            className="relative flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 py-2 px-1 sm:px-3 rounded-xl text-sm font-bold transition-colors duration-200 min-h-[44px]"
            style={{ color: isActive ? '#0F172A' : '#94a3b8', zIndex: 1 }}
          >
            {isActive && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 rounded-xl"
                style={{ background: '#2DD4BF' }}
                transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
              />
            )}
            <span className="relative text-base sm:text-lg">{mode.emoji}</span>
            <span className="relative text-xs sm:text-sm">{t(mode.labelKey)}</span>
          </button>
        );
      })}
    </nav>
  );
}
