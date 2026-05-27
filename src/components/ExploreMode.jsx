import { useState } from 'react';
import { motion } from 'framer-motion';
import CoordinatePlane from './CoordinatePlane';
import LineEquationDisplay from './LineEquationDisplay';
import Slider from './Slider';
import { useLinearFunction } from '../hooks/useLinearFunction';
import { useTranslation } from '../i18n';

export default function ExploreMode() {
  const [m, setM] = useState(1);
  const [b, setB] = useState(0);
  const [showRiseRun, setShowRiseRun] = useState(true);
  const { t } = useTranslation();
  const { points, plainEnglish, interceptText } = useLinearFunction(m, b);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white">{t('explore.title')}</h2>
        <p className="text-slate-400 text-sm mt-0.5">{t('explore.subtitle')}</p>
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Graph */}
        <div className="flex-1 rounded-2xl p-3 min-w-0" style={{ background: '#1E293B', border: '1px solid #334155' }}>
          <CoordinatePlane m={m} b={b} showLine showRiseRun={showRiseRun} />
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 w-full lg:w-72 shrink-0">
          <LineEquationDisplay m={m} b={b} />

          {/* Sliders */}
          <div className="rounded-2xl p-4 flex flex-col gap-5" style={{ background: '#1E293B', border: '1px solid #334155' }}>
            <Slider
              label={t('explore.slope')}
              value={m} min={-5} max={5} step={0.5}
              onChange={setM} color="#2DD4BF"
              ariaLabel={t('explore.slopeAria')}
            />
            <Slider
              label={t('explore.intercept')}
              value={b} min={-10} max={10} step={1}
              onChange={setB} color="#FCD34D"
              ariaLabel={t('explore.interceptAria')}
            />

            {/* Rise/run toggle */}
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={showRiseRun}
                  onChange={(e) => setShowRiseRun(e.target.checked)}
                  aria-label={t('explore.showRiseRunAria')}
                />
                <div className="w-11 h-6 rounded-full transition-colors duration-200"
                  style={{ background: showRiseRun ? '#2DD4BF' : '#334155' }} />
                <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
                  style={{ transform: showRiseRun ? 'translateX(20px)' : 'translateX(0)' }} />
              </div>
              <span className="text-sm font-bold text-slate-300">{t('explore.showRiseRun')}</span>
            </label>
          </div>

          {/* Plain-language explanation */}
          <div className="rounded-2xl p-4" style={{ background: '#1E293B', border: '1px solid #334155' }}>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t('explore.whatMeans')}</p>
            <motion.p key={plainEnglish} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
              className="text-white font-semibold text-sm leading-relaxed">
              {plainEnglish}
            </motion.p>
            <motion.p key={interceptText} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }} className="text-slate-300 text-sm mt-1 leading-relaxed">
              {interceptText}
            </motion.p>
          </div>

          {/* Value table */}
          <div className="rounded-2xl p-4" style={{ background: '#1E293B', border: '1px solid #334155' }}>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">{t('explore.valueTable')}</p>
            <table className="w-full text-sm text-center">
              <thead>
                <tr>
                  <th className="pb-2 font-extrabold" style={{ color: '#2DD4BF' }}>x</th>
                  <th className="pb-2 font-extrabold" style={{ color: '#FCD34D' }}>y</th>
                </tr>
              </thead>
              <tbody>
                {points.map(({ x, y }) => (
                  <motion.tr key={`${x}-${y}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="border-t" style={{ borderColor: '#334155' }}>
                    <td className="py-1.5 font-bold text-slate-300">{x}</td>
                    <td className="py-1.5 font-extrabold" style={{ color: '#FCD34D' }}>{y}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Fun facts */}
      <div className="rounded-2xl p-4 flex gap-4 flex-wrap" style={{ background: '#1E293B', border: '1px solid #334155' }}>
        {[
          { icon: '📐', titleKey: 'explore.facts.slopeTitle',     textKey: 'explore.facts.slopeText',     color: '#2DD4BF' },
          { icon: '📍', titleKey: 'explore.facts.interceptTitle', textKey: 'explore.facts.interceptText', color: '#FCD34D' },
          { icon: '📏', titleKey: 'explore.facts.linearTitle',    textKey: 'explore.facts.linearText',    color: '#a78bfa' },
        ].map((fact) => (
          <div key={fact.titleKey} className="flex gap-3 flex-1 min-w-[200px]">
            <span className="text-2xl">{fact.icon}</span>
            <div>
              <p className="font-extrabold text-sm" style={{ color: fact.color }}>{t(fact.titleKey)}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{t(fact.textKey)}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
