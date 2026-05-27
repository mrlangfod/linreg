import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoordinatePlane from './CoordinatePlane';
import Slider from './Slider';
import { QUIZ_QUESTIONS } from '../constants';
import { useTranslation } from '../i18n';

function Stars({ score, total }) {
  const pct = score / total;
  const stars = pct >= 0.875 ? 3 : pct >= 0.625 ? 2 : 1;
  const { t } = useTranslation();
  return (
    <div className="flex gap-2 justify-center text-4xl" aria-label={t('quiz.stars', { stars })}>
      {[1, 2, 3].map((s) => (
        <motion.span key={s}
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: s <= stars ? 1 : 0.6, rotate: 0, opacity: s <= stars ? 1 : 0.25 }}
          transition={{ delay: s * 0.15, type: 'spring', bounce: 0.5 }}>
          ⭐
        </motion.span>
      ))}
    </div>
  );
}

function GraphToEquation({ question, onAnswer, answered }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl p-3" style={{ background: '#1E293B', border: '1px solid #334155' }}>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          {t('quiz.formatAInstruction')}
        </p>
        <CoordinatePlane m={question.m} b={question.b} showLine />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {question.options.map((opt, i) => {
          let style = {};
          if (answered !== null) {
            if (i === question.correct)
              style = { background: '#14532d', border: '2px solid #22c55e', color: '#86efac' };
            else if (i === answered)
              style = { background: '#450a0a', border: '2px solid #ef4444', color: '#fca5a5' };
            else
              style = { background: '#0F172A', border: '1.5px solid #334155', color: '#475569', opacity: 0.6 };
          } else {
            style = { background: '#1E293B', border: '1.5px solid #334155', color: '#e2e8f0' };
          }
          return (
            <button key={i} onClick={() => !answered && onAnswer(i)}
              disabled={answered !== null}
              aria-label={`Option: ${opt}`} aria-pressed={answered === i}
              className="py-3 px-4 rounded-xl text-lg font-extrabold min-h-[56px] transition-all duration-200"
              style={{ ...style, cursor: answered !== null ? 'default' : 'pointer' }}>
              {answered !== null && i === question.correct && <span aria-hidden className="mr-1">✓</span>}
              {answered !== null && i === answered && i !== question.correct && <span aria-hidden className="mr-1">✗</span>}
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EquationToLine({ question, onAnswer, answered }) {
  const [userM, setUserM] = useState(0);
  const [userB, setUserB] = useState(0);
  const { t } = useTranslation();

  const isCorrect =
    Math.abs(userM - question.m) <= question.tolerance &&
    Math.abs(userB - question.b) <= question.tolerance;

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl p-4 text-center" style={{ background: '#1E293B', border: '1px solid #334155' }}>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          {t('quiz.formatBInstruction')}
        </p>
        <p className="text-3xl font-black" style={{ color: '#FCD34D' }}>{question.equation}</p>
      </div>
      <div className="rounded-2xl p-3" style={{ background: '#1E293B', border: '1px solid #334155' }}>
        <CoordinatePlane m={userM} b={userB} showLine highlightLine
          lineColor={answered === null ? '#2DD4BF' : answered === 'correct' ? '#22c55e' : '#ef4444'} />
      </div>
      <div className="rounded-2xl p-4 flex flex-col gap-4" style={{ background: '#1E293B', border: '1px solid #334155' }}>
        <Slider label={t('explore.slope')} value={userM} min={-5} max={5} step={0.5}
          onChange={setUserM} color="#2DD4BF" ariaLabel={t('explore.slopeAria')} />
        <Slider label={t('explore.intercept')} value={userB} min={-10} max={10} step={1}
          onChange={setUserB} color="#FCD34D" ariaLabel={t('explore.interceptAria')} />
      </div>

      {answered === null && (
        <button onClick={() => onAnswer(isCorrect ? 'correct' : 'wrong')}
          aria-label={t('quiz.submit')}
          className="w-full py-3 rounded-2xl font-extrabold text-lg min-h-[52px]"
          style={{ background: '#2DD4BF', color: '#0F172A' }}>
          {t('quiz.submit')}
        </button>
      )}

      {answered !== null && (
        <div className="rounded-2xl p-4 text-center"
          style={{
            background: answered === 'correct' ? '#14532d' : '#450a0a',
            border: `1.5px solid ${answered === 'correct' ? '#22c55e' : '#ef4444'}`,
          }}
          role="alert">
          {answered === 'correct' ? (
            <><span className="text-2xl">🎉</span>
              <p className="font-extrabold text-green-300 mt-1">{t('quiz.correctLabel')}</p></>
          ) : (
            <><span className="text-2xl">💡</span>
              <p className="font-extrabold text-red-300 mt-1">{t('quiz.wrongLabel')}</p>
              <p className="text-red-200 text-sm mt-1">
                {t('quiz.wrongAnswer', { m: question.m, b: question.b })}
              </p></>
          )}
        </div>
      )}
    </div>
  );
}

export default function QuizMode() {
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showEnd, setShowEnd] = useState(false);
  const { t } = useTranslation();

  const question = QUIZ_QUESTIONS[qIdx];
  const answered = answers[question.id] ?? null;

  const correctCount = QUIZ_QUESTIONS.filter((q) => {
    const a = answers[q.id];
    if (a === undefined) return false;
    return q.type === 'graphToEquation' ? a === q.correct : a === 'correct';
  }).length;

  const handleAnswer = useCallback((answer) => {
    setAnswers((prev) => ({ ...prev, [question.id]: answer }));
  }, [question.id]);

  const handleNext = () => {
    if (qIdx < QUIZ_QUESTIONS.length - 1) setQIdx(qIdx + 1);
    else setShowEnd(true);
  };

  const handleReplay = () => { setQIdx(0); setAnswers({}); setShowEnd(false); };

  if (showEnd) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-6 py-12 px-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }} className="text-6xl">
          🕵️
        </motion.div>
        <h2 className="text-3xl font-black text-white text-center">{t('quiz.endTitle')}</h2>
        <div className="rounded-2xl p-6 text-center w-full max-w-sm"
          style={{ background: '#1E293B', border: '1px solid #334155' }}>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">{t('quiz.endYourScore')}</p>
          <p className="text-5xl font-black text-white mb-1">
            {correctCount} <span className="text-2xl text-slate-400">/ {QUIZ_QUESTIONS.length}</span>
          </p>
          <p className="text-slate-400 text-sm mb-4">
            {correctCount >= 7 ? t('quiz.endBrilliant') :
             correctCount >= 5 ? t('quiz.endGood') :
             t('quiz.endKeepGoing')}
          </p>
          <Stars score={correctCount} total={QUIZ_QUESTIONS.length} />
        </div>
        <button onClick={handleReplay} aria-label={t('quiz.playAgainAria')}
          className="px-8 py-3 rounded-2xl font-extrabold text-lg min-h-[52px]"
          style={{ background: '#2DD4BF', color: '#0F172A' }}>
          {t('quiz.playAgain')}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
      className="flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-extrabold text-white">{t('quiz.title')}</h2>
          <p className="text-slate-400 text-sm mt-0.5">{t('quiz.subtitle')}</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
          style={{ background: '#1E293B', border: '1px solid #334155' }}
          aria-label={t('quiz.scoreAria', { correct: correctCount, total: QUIZ_QUESTIONS.length })}>
          <span className="text-xl font-black" style={{ color: '#FCD34D' }}>{correctCount}</span>
          <span className="text-slate-400 text-sm font-bold">/ {QUIZ_QUESTIONS.length}</span>
          <span className="text-sm">🏆</span>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>{t('quiz.questionOf', { n: qIdx + 1, total: QUIZ_QUESTIONS.length })}</span>
          <span>{question.type === 'graphToEquation' ? t('quiz.formatA') : t('quiz.formatB')}</span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: '#334155' }}>
          <div className="h-full rounded-full transition-all duration-300"
            style={{ width: `${((qIdx + 1) / QUIZ_QUESTIONS.length) * 100}%`, background: '#2DD4BF' }} />
        </div>
      </div>

      {/* Question dots */}
      <div className="flex gap-2 justify-center flex-wrap">
        {QUIZ_QUESTIONS.map((q, i) => {
          const a = answers[q.id];
          const isCorrect = q.type === 'graphToEquation' ? a === q.correct : a === 'correct';
          const isDone = a !== undefined;
          return (
            <div key={q.id}
              aria-label={`${i + 1}${isDone ? (isCorrect ? ', correct' : ', wrong') : ''}`}
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: i === qIdx ? '#2DD4BF' : isDone && isCorrect ? '#14532d' : isDone ? '#450a0a' : '#1E293B',
                border: `1.5px solid ${i === qIdx ? '#2DD4BF' : isDone && isCorrect ? '#22c55e' : isDone ? '#ef4444' : '#334155'}`,
                color: i === qIdx ? '#0F172A' : isDone && isCorrect ? '#22c55e' : isDone ? '#ef4444' : '#475569',
              }}>
              {isDone ? (isCorrect ? '✓' : '✗') : i + 1}
            </div>
          );
        })}
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div key={qIdx}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}
          className="max-w-xl mx-auto w-full">
          {question.type === 'graphToEquation'
            ? <GraphToEquation question={question} onAnswer={handleAnswer} answered={answered} />
            : <EquationToLine   question={question} onAnswer={handleAnswer} answered={answered} />}
        </motion.div>
      </AnimatePresence>

      {/* Next button */}
      <AnimatePresence>
        {answered !== null && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto w-full">
            <button onClick={handleNext}
              aria-label={qIdx < QUIZ_QUESTIONS.length - 1 ? t('quiz.nextQuestion') : t('quiz.seeResults')}
              className="w-full py-3 rounded-2xl font-extrabold text-lg min-h-[52px] mt-2"
              style={{ background: '#2DD4BF', color: '#0F172A' }}>
              {qIdx < QUIZ_QUESTIONS.length - 1 ? t('quiz.nextQuestion') : t('quiz.seeResults')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
