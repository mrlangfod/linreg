import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoordinatePlane from './CoordinatePlane';
import Slider from './Slider';
import Confetti from './Confetti';
import { STORY_CHALLENGES } from '../constants';
import { useTranslation } from '../i18n';

function getHint(userM, userB, challenge, t) {
  const mOk = Math.abs(userM - challenge.m) <= challenge.tolerance;
  const bOk = Math.abs(userB - challenge.b) <= challenge.tolerance;
  const hintSlope     = t(`story.challenges.${challenge.id}.hint_slope`);
  const hintIntercept = t(`story.challenges.${challenge.id}.hint_intercept`);

  if (mOk && bOk) return null;
  if (bOk && !mOk) return hintSlope;
  if (mOk && !bOk) return hintIntercept;
  return `${hintSlope} ${hintIntercept.charAt(0).toLowerCase()}${hintIntercept.slice(1)}`;
}

export default function StoryMode({ completedChallenges, onComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [m, setM] = useState(0);
  const [b, setB] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [confettiActive, setConfettiActive] = useState(false);
  const { t } = useTranslation();

  const challenge = STORY_CHALLENGES[currentIdx];

  const handleCheck = useCallback(() => {
    const hint = getHint(m, b, challenge, t);
    if (hint === null) {
      setConfettiActive(false);
      setTimeout(() => setConfettiActive(true), 10);
      onComplete(challenge.id);
      setFeedback({ correct: true });
    } else {
      setFeedback({ correct: false, hint });
    }
  }, [m, b, challenge, t, onComplete]);

  const goTo = (idx) => { setCurrentIdx(idx); setM(0); setB(0); setFeedback(null); };

  const bDisplay = (bVal) =>
    bVal >= 0
      ? `+ ${bVal}`
      : `− ${Math.abs(bVal)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
      className="flex flex-col gap-4"
    >
      <Confetti active={confettiActive} />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-extrabold text-white">{t('story.title')}</h2>
          <p className="text-slate-400 text-sm mt-0.5">{t('story.subtitle')}</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
          style={{ background: '#1E293B', border: '1px solid #334155' }}>
          <span className="text-2xl font-black" style={{ color: '#FCD34D' }}>{completedChallenges.size}</span>
          <span className="text-slate-400 text-sm font-bold">/ {STORY_CHALLENGES.length} {t('story.done')}</span>
          <span className="text-xl ml-1">
            {completedChallenges.size === STORY_CHALLENGES.length ? '🏆' : '⭐'.repeat(completedChallenges.size)}
          </span>
        </div>
      </div>

      {/* Challenge pills */}
      <div className="flex gap-2 flex-wrap">
        {STORY_CHALLENGES.map((ch, i) => {
          const done = completedChallenges.has(ch.id);
          const active = i === currentIdx;
          return (
            <button key={ch.id} onClick={() => goTo(i)}
              aria-label={`${t(`story.challenges.${ch.id}.title`)}`}
              aria-current={active ? 'true' : undefined}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold min-h-[44px] transition-all duration-200"
              style={{
                background: active ? '#2DD4BF' : done ? '#134e4a' : '#1E293B',
                color: active ? '#0F172A' : done ? '#2DD4BF' : '#94a3b8',
                border: `1.5px solid ${active ? '#2DD4BF' : done ? '#2DD4BF' : '#334155'}`,
              }}>
              <span>{ch.emoji}</span>
              <span>{i + 1}. {t(`story.challenges.${ch.id}.title`)}</span>
              {done && <span aria-label="Completed">✓</span>}
            </button>
          );
        })}
      </div>

      {/* Challenge area */}
      <AnimatePresence mode="wait">
        <motion.div key={currentIdx}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
          className="flex flex-col lg:flex-row gap-4"
        >
          {/* Graph */}
          <div className="flex-1 rounded-2xl p-3 min-w-0"
            style={{ background: '#1E293B', border: '1px solid #334155' }}>
            <CoordinatePlane m={m} b={b} showLine />
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-4 w-full lg:w-72 shrink-0">
            {/* Problem card */}
            <div className="rounded-2xl p-4" style={{ background: '#1E293B', border: '1px solid #334155' }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">{challenge.emoji}</span>
                <div>
                  <p className="font-extrabold text-white">{t(`story.challenges.${challenge.id}.title`)}</p>
                  <p className="text-xs text-slate-500">
                    {t('story.challengeOf', { n: currentIdx + 1, total: STORY_CHALLENGES.length })}
                  </p>
                </div>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">
                {t(`story.challenges.${challenge.id}.problem`)}
              </p>
            </div>

            {/* Sliders */}
            <div className="rounded-2xl p-4 flex flex-col gap-5"
              style={{ background: '#1E293B', border: '1px solid #334155' }}>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{t('story.adjustLine')}</p>
              <Slider label={t('explore.slope')} value={m} min={-5} max={5} step={0.5}
                onChange={setM} color="#2DD4BF" ariaLabel={t('explore.slopeAria')} />
              <Slider label={t('explore.intercept')} value={b} min={-10} max={10} step={1}
                onChange={setB} color="#FCD34D" ariaLabel={t('explore.interceptAria')} />

              <div className="text-center py-2 px-3 rounded-xl text-lg font-black"
                style={{ background: '#0F172A', color: '#2DD4BF' }}>
                y = {m === 1 ? '' : m === -1 ? '−' : m}x{' '}
                {b > 0 ? `+ ${b}` : b < 0 ? `− ${Math.abs(b)}` : ''}
              </div>
            </div>

            {/* Check button */}
            <button onClick={handleCheck} disabled={feedback?.correct}
              aria-label={t('story.checkAnswer')}
              className="w-full py-3 rounded-2xl font-extrabold text-lg transition-all duration-200 min-h-[52px]"
              style={{
                background: feedback?.correct ? '#134e4a' : '#2DD4BF',
                color: feedback?.correct ? '#2DD4BF' : '#0F172A',
                border: `2px solid ${feedback?.correct ? '#2DD4BF' : 'transparent'}`,
                cursor: feedback?.correct ? 'default' : 'pointer',
              }}>
              {feedback?.correct ? t('story.correct') : t('story.checkAnswer')}
            </button>

            {/* Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }} className="rounded-2xl p-4"
                  style={{
                    background: feedback.correct ? '#14532d' : '#450a0a',
                    border: `1.5px solid ${feedback.correct ? '#22c55e' : '#ef4444'}`,
                  }}
                  role="alert" aria-live="polite">
                  {feedback.correct ? (
                    <div className="text-center">
                      <p className="text-2xl mb-1">🎉</p>
                      <p className="font-extrabold text-green-300 text-lg">{t('story.successTitle')}</p>
                      <p className="text-green-400 text-sm mt-1">
                        {t('story.successLine', {
                          m: challenge.m,
                          b: bDisplay(challenge.b),
                        })}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-extrabold text-red-300 flex items-center gap-2">
                        {t('story.hintLabel')}
                      </p>
                      <p className="text-red-200 text-sm mt-1 leading-relaxed">{feedback.hint}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex gap-3">
              <button onClick={() => goTo(Math.max(0, currentIdx - 1))}
                disabled={currentIdx === 0} aria-label={t('story.prev')}
                className="flex-1 py-2 rounded-xl font-bold text-sm min-h-[44px] transition-colors duration-200"
                style={{
                  background: '#1E293B', border: '1.5px solid #334155',
                  color: currentIdx === 0 ? '#475569' : '#94a3b8',
                  cursor: currentIdx === 0 ? 'default' : 'pointer',
                }}>
                {t('story.prev')}
              </button>
              <button onClick={() => goTo(Math.min(STORY_CHALLENGES.length - 1, currentIdx + 1))}
                disabled={currentIdx === STORY_CHALLENGES.length - 1} aria-label={t('story.next')}
                className="flex-1 py-2 rounded-xl font-bold text-sm min-h-[44px] transition-colors duration-200"
                style={{
                  background: '#1E293B', border: '1.5px solid #334155',
                  color: currentIdx === STORY_CHALLENGES.length - 1 ? '#475569' : '#94a3b8',
                  cursor: currentIdx === STORY_CHALLENGES.length - 1 ? 'default' : 'pointer',
                }}>
                {t('story.next')}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
