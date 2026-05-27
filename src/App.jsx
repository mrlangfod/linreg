import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LanguageProvider } from './i18n';
import { useTranslation } from './i18n';
import ModeNav from './components/ModeNav';
import LanguageSwitcher from './components/LanguageSwitcher';
import ExploreMode from './components/ExploreMode';
import StoryMode from './components/StoryMode';
import PatternMode from './components/PatternMode';
import QuizMode from './components/QuizMode';

function AppInner() {
  const [activeMode, setActiveMode] = useState('explore');
  const [completedStories, setCompletedStories] = useState(new Set());
  const { t } = useTranslation();

  const handleStoryComplete = (id) => {
    setCompletedStories((prev) => new Set([...prev, id]));
  };

  return (
    <div className="min-h-screen" style={{ background: '#0F172A', fontFamily: "'Nunito', sans-serif" }}>
      {/* Top bar */}
      <header
        className="sticky top-0 z-40 px-4 py-3"
        style={{
          background: 'rgba(15,23,42,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #1E293B',
        }}
      >
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">📈</span>
            <div>
              <h1 className="text-lg font-black leading-none" style={{ color: '#2DD4BF' }}>
                {t('app.title')}
              </h1>
              <p className="text-xs leading-none" style={{ color: '#475569' }}>
                {t('app.subtitle')}
              </p>
            </div>
          </div>

          {/* Nav */}
          <div className="flex-1 w-full">
            <ModeNav activeMode={activeMode} onModeChange={setActiveMode} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {activeMode === 'explore' && (
            <motion.div key="explore"><ExploreMode /></motion.div>
          )}
          {activeMode === 'story' && (
            <motion.div key="story">
              <StoryMode completedChallenges={completedStories} onComplete={handleStoryComplete} />
            </motion.div>
          )}
          {activeMode === 'pattern' && (
            <motion.div key="pattern"><PatternMode /></motion.div>
          )}
          {activeMode === 'quiz' && (
            <motion.div key="quiz"><QuizMode /></motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-6 text-xs flex flex-col items-center gap-3" style={{ color: '#334155' }}>
        <LanguageSwitcher />
        <span>{t('app.footer')}</span>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}
