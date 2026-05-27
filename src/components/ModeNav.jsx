import { motion } from 'framer-motion';

const MODES = [
  { id: 'explore',  label: 'Explore',  emoji: '🔭' },
  { id: 'story',    label: 'Stories',  emoji: '📖' },
  { id: 'pattern',  label: 'Patterns', emoji: '🔢' },
  { id: 'quiz',     label: 'Detective',emoji: '🕵️' },
];

export default function ModeNav({ activeMode, onModeChange }) {
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
            aria-label={mode.label}
            className="relative flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 py-2 px-1 sm:px-3 rounded-xl text-sm font-bold transition-colors duration-200 min-h-[44px]"
            style={{
              color: isActive ? '#0F172A' : '#94a3b8',
              zIndex: 1,
            }}
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
            <span className="relative text-xs sm:text-sm">{mode.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
