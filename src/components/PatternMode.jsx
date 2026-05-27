import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as d3 from 'd3';
import { PATTERN_SETS } from '../constants';
import { useTranslation } from '../i18n';

const MARGIN = { top: 20, right: 20, bottom: 40, left: 40 };
const AXIS_RANGE = 10;

// How many dashed-circle hints to show per level (6 points total)
const HINTS_BY_LEVEL = { 1: 6, 2: 4, 3: 2, 4: 0 };

function PatternPlane({ targetPoints, placedPoints, onPlaneClick, lineRevealed, patternSet, visibleHintCount }) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  const draw = useCallback(() => {
    const container = containerRef.current;
    if (!container || !svgRef.current) return;

    const totalWidth = container.clientWidth || 400;
    const totalHeight = Math.min(totalWidth * 0.85, 420);
    const w = totalWidth - MARGIN.left - MARGIN.right;
    const h = totalHeight - MARGIN.top - MARGIN.bottom;

    const xScale = d3.scaleLinear().domain([-AXIS_RANGE, AXIS_RANGE]).range([0, w]);
    const yScale = d3.scaleLinear().domain([-AXIS_RANGE, AXIS_RANGE]).range([h, 0]);

    let svg = d3.select(svgRef.current);
    const isNew = svg.select('g.root').empty();

    if (isNew) {
      svg.attr('width', totalWidth).attr('height', totalHeight);
      const defs = svg.append('defs');
      defs.append('clipPath').attr('id', 'pat-clip')
        .append('rect').attr('x', 0).attr('y', 0).attr('width', w).attr('height', h);

      // filterUnits="userSpaceOnUse" + fixed region so horizontal lines
      // (m=0) don't collapse the filter region to zero height.
      const filter = defs.append('filter').attr('id', 'pat-glow')
        .attr('filterUnits', 'userSpaceOnUse')
        .attr('x', -20).attr('y', -20)
        .attr('width', w + 40).attr('height', h + 40);
      filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'coloredBlur');
      const feMerge = filter.append('feMerge');
      feMerge.append('feMergeNode').attr('in', 'coloredBlur');
      feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

      defs.append('marker').attr('id', 'pat-arrow')
        .attr('viewBox', '0 0 10 10').attr('refX', 10).attr('refY', 5)
        .attr('markerWidth', 6).attr('markerHeight', 6).attr('orient', 'auto')
        .append('path').attr('d', 'M 0 0 L 10 5 L 0 10 z').attr('fill', '#94a3b8');

      const root = svg.append('g').attr('class', 'root')
        .attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);

      // Grid — skip i=0, axis lines cover x=0 and y=0
      d3.range(-AXIS_RANGE, AXIS_RANGE + 1).forEach((i) => {
        if (i === 0) return;
        const isMajor = i % 5 === 0;
        const stroke = isMajor ? '#334155' : '#1E293B';
        const sw = isMajor ? 1 : 0.5;
        root.append('line').attr('class', isMajor ? 'grid-major' : 'grid-minor')
          .attr('x1', xScale(i)).attr('y1', 0).attr('x2', xScale(i)).attr('y2', h)
          .attr('stroke', stroke).attr('stroke-width', sw);
        root.append('line').attr('class', isMajor ? 'grid-major' : 'grid-minor')
          .attr('x1', 0).attr('y1', yScale(i)).attr('x2', w).attr('y2', yScale(i))
          .attr('stroke', stroke).attr('stroke-width', sw);
      });

      // X axis (left → right, arrow at positive end)
      root.append('line').attr('class', 'axis-line')
        .attr('x1', 0).attr('y1', yScale(0)).attr('x2', w).attr('y2', yScale(0))
        .attr('stroke', '#94a3b8').attr('stroke-width', 2)
        .attr('marker-end', 'url(#pat-arrow)');
      // Y axis (bottom → top, arrow at positive end)
      root.append('line').attr('class', 'axis-line')
        .attr('x1', xScale(0)).attr('y1', h).attr('x2', xScale(0)).attr('y2', 0)
        .attr('stroke', '#94a3b8').attr('stroke-width', 2)
        .attr('marker-end', 'url(#pat-arrow)');

      d3.range(-AXIS_RANGE, AXIS_RANGE + 1).forEach((i) => {
        if (i === 0) return;
        root.append('text').attr('x', xScale(i)).attr('y', yScale(0) + 18)
          .attr('text-anchor', 'middle').attr('font-size', 10).attr('fill', '#64748b')
          .text(i % 5 === 0 || Math.abs(i) <= 3 ? i : '');
        root.append('text').attr('x', xScale(0) - 8).attr('y', yScale(i) + 4)
          .attr('text-anchor', 'end').attr('font-size', 10).attr('fill', '#64748b')
          .text(i % 5 === 0 || Math.abs(i) <= 3 ? i : '');
      });

      root.append('text').attr('x', w - 8).attr('y', yScale(0) - 8)
        .attr('fill', '#94a3b8').attr('font-size', 13).attr('font-weight', 700).text('x');
      root.append('text').attr('x', xScale(0) + 8).attr('y', 12)
        .attr('fill', '#94a3b8').attr('font-size', 13).attr('font-weight', 700).text('y');

      root.append('g').attr('class', 'reveal-line-g').attr('clip-path', 'url(#pat-clip)');
      root.append('g').attr('class', 'target-pts-g').attr('clip-path', 'url(#pat-clip)');
      root.append('g').attr('class', 'placed-pts-g').attr('clip-path', 'url(#pat-clip)');

      root.append('rect').attr('class', 'click-overlay')
        .attr('x', 0).attr('y', 0).attr('width', w).attr('height', h)
        .attr('fill', 'transparent').attr('cursor', 'crosshair')
        .on('click', function (event) {
          const [px, py] = d3.pointer(event);
          const mathX = Math.round(xScale.invert(px));
          const mathY = Math.round(yScale.invert(py));
          if (mathX >= -AXIS_RANGE && mathX <= AXIS_RANGE &&
              mathY >= -AXIS_RANGE && mathY <= AXIS_RANGE) {
            onPlaneClick(mathX, mathY);
          }
        });
    } else {
      svg.attr('width', totalWidth).attr('height', totalHeight);
    }

    const root = svg.select('g.root');

    // Target points — only show dashed-circle hints for the first `visibleHintCount` points
    const hintPoints = targetPoints.slice(0, visibleHintCount ?? targetPoints.length);
    const targetG = root.select('g.target-pts-g');
    const tPts = targetG.selectAll('g.target-pt').data(hintPoints, (d) => `${d.x},${d.y}`);
    tPts.enter().append('g').attr('class', 'target-pt').each(function (d) {
      d3.select(this).append('circle')
        .attr('cx', xScale(d.x)).attr('cy', yScale(d.y)).attr('r', 7)
        .attr('fill', 'none').attr('stroke', '#FCD34D').attr('stroke-width', 2)
        .attr('stroke-dasharray', '3,2').attr('opacity', 0.7);
      d3.select(this).append('text')
        .attr('x', xScale(d.x) + 10).attr('y', yScale(d.y) - 8)
        .attr('font-size', 11).attr('fill', '#FCD34D').attr('font-weight', 700)
        .text(`(${d.x}, ${d.y})`);
    });
    tPts.exit().remove();

    // Placed points
    const placedG = root.select('g.placed-pts-g');
    const pPts = placedG.selectAll('g.placed-pt').data(placedPoints, (d) => `${d.x},${d.y}`);
    pPts.enter().append('g').attr('class', 'placed-pt').each(function (d) {
      const g = d3.select(this);
      const cx = xScale(d.x), cy = yScale(d.y);
      g.append('circle').attr('cx', cx).attr('cy', cy).attr('r', 7)
        .attr('fill', 'none').attr('stroke', '#2DD4BF').attr('stroke-width', 2).attr('opacity', 0.8)
        .transition().duration(600).attr('r', 18).attr('opacity', 0).remove();
      g.append('circle').attr('cx', cx).attr('cy', cy).attr('r', 0)
        .attr('fill', '#2DD4BF').attr('stroke', 'white').attr('stroke-width', 1.5)
        .transition().duration(400).ease(d3.easeBounceOut).attr('r', 7);
    });
    pPts.exit().remove();

    // Reveal line
    const lineG = root.select('g.reveal-line-g');
    lineG.selectAll('*').remove();
    if (lineRevealed && patternSet) {
      const { m, b } = patternSet;
      let x1 = -AXIS_RANGE, x2 = AXIS_RANGE;
      let y1 = m * x1 + b, y2 = m * x2 + b;
      if (m !== 0) {
        const xa = (-AXIS_RANGE - b) / m, xb = (AXIS_RANGE - b) / m;
        x1 = Math.max(-AXIS_RANGE, Math.min(AXIS_RANGE, Math.min(xa, xb)));
        x2 = Math.max(-AXIS_RANGE, Math.min(AXIS_RANGE, Math.max(xa, xb)));
        y1 = m * x1 + b; y2 = m * x2 + b;
      } else {
        y1 = y2 = Math.max(-AXIS_RANGE, Math.min(AXIS_RANGE, b));
      }
      const len = Math.hypot(xScale(x2) - xScale(x1), yScale(y2) - yScale(y1));
      lineG.append('line')
        .attr('x1', xScale(x1)).attr('y1', yScale(y1))
        .attr('x2', xScale(x2)).attr('y2', yScale(y2))
        .attr('stroke', '#2DD4BF').attr('stroke-width', 2.5)
        .attr('stroke-dasharray', len).attr('stroke-dashoffset', len)
        .attr('filter', 'url(#pat-glow)')
        .transition().duration(800).ease(d3.easeLinear).attr('stroke-dashoffset', 0);
    }
  }, [targetPoints, placedPoints, lineRevealed, patternSet, onPlaneClick, visibleHintCount]);

  useEffect(() => { draw(); }, [draw]);
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => {
      if (svgRef.current) d3.select(svgRef.current).selectAll('*').remove();
      draw();
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [draw]);

  return (
    <div ref={containerRef} className="w-full" style={{ cursor: 'crosshair' }}>
      <svg ref={svgRef} style={{ display: 'block', width: '100%' }} />
    </div>
  );
}

export default function PatternMode() {
  const [setIdx, setSetIdx] = useState(0);
  const [placedPoints, setPlacedPoints] = useState([]);
  const [lineRevealed, setLineRevealed] = useState(false);
  const { t } = useTranslation();

  const patternSet = PATTERN_SETS[setIdx];
  const targetPoints = patternSet.points;
  const allPlaced = placedPoints.length >= targetPoints.length;

  const handlePlaneClick = useCallback((x, y) => {
    if (lineRevealed) return;
    const match = targetPoints.find(
      (tp) => tp.x === x && tp.y === y &&
        !placedPoints.some((pp) => pp.x === x && pp.y === y)
    );
    if (match) setPlacedPoints((prev) => [...prev, { x, y }]);
  }, [targetPoints, placedPoints, lineRevealed]);

  const resetSet = (idx) => { setSetIdx(idx); setPlacedPoints([]); setLineRevealed(false); };

  const fmt = (n) => (Number.isInteger(n) ? n : parseFloat(n.toFixed(2)));

  const buildEquation = (m, b) => {
    const mV = fmt(m), bV = fmt(b);
    let eq = 'y = ';
    if (mV === 0) return `y = ${bV}`;
    if (mV === 1) eq += 'x';
    else if (mV === -1) eq += '−x';
    else eq += `${mV}x`;
    if (bV !== 0) eq += bV > 0 ? ` + ${bV}` : ` − ${Math.abs(bV)}`;
    return eq;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
      className="flex flex-col gap-4"
    >
      <div>
        <h2 className="text-2xl font-extrabold text-white">{t('pattern.title')}</h2>
        <p className="text-slate-400 text-sm mt-0.5">{t('pattern.subtitle')}</p>
      </div>

      {/* Level selector */}
      <div className="flex gap-2 flex-wrap">
        {PATTERN_SETS.map((ps, i) => (
          <button key={ps.id} onClick={() => resetSet(i)}
            aria-label={t(`pattern.levels.${ps.id}`)}
            aria-current={i === setIdx ? 'true' : undefined}
            className="px-4 py-2 rounded-xl text-sm font-bold min-h-[44px] transition-all duration-200"
            style={{
              background: i === setIdx ? '#2DD4BF' : '#1E293B',
              color: i === setIdx ? '#0F172A' : '#94a3b8',
              border: `1.5px solid ${i === setIdx ? '#2DD4BF' : '#334155'}`,
            }}>
            {t(`pattern.levels.${ps.id}`)}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={setIdx}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
          className="flex flex-col lg:flex-row gap-4"
        >
          {/* Graph */}
          <div className="flex-1 rounded-2xl p-3 min-w-0"
            style={{ background: '#1E293B', border: '1px solid #334155' }}>
            <PatternPlane
              targetPoints={targetPoints} placedPoints={placedPoints}
              onPlaneClick={handlePlaneClick} lineRevealed={lineRevealed} patternSet={patternSet}
              visibleHintCount={HINTS_BY_LEVEL[patternSet.id]}
            />
          </div>

          {/* Side panel */}
          <div className="flex flex-col gap-4 w-full lg:w-72 shrink-0">
            {/* Points to plot */}
            <div className="rounded-2xl p-4" style={{ background: '#1E293B', border: '1px solid #334155' }}>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                {t('pattern.pointsToPlot')}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {targetPoints.map((pt) => {
                  const placed = placedPoints.some((pp) => pp.x === pt.x && pp.y === pt.y);
                  return (
                    <div key={`${pt.x},${pt.y}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold"
                      style={{
                        background: placed ? '#134e4a' : '#0F172A',
                        border: `1.5px solid ${placed ? '#2DD4BF' : '#334155'}`,
                        color: placed ? '#2DD4BF' : '#94a3b8',
                      }}>
                      {placed ? '✓' : '○'}
                      <span>({pt.x}, {pt.y})</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Progress */}
            <div className="rounded-2xl p-4" style={{ background: '#1E293B', border: '1px solid #334155' }}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-slate-400">{t('pattern.progress')}</span>
                <span className="font-extrabold text-white">{placedPoints.length} / {targetPoints.length}</span>
              </div>
              <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: '#334155' }}>
                <motion.div className="h-full rounded-full" style={{ background: '#2DD4BF' }}
                  animate={{ width: `${(placedPoints.length / targetPoints.length) * 100}%` }}
                  transition={{ duration: 0.3 }} />
              </div>
            </div>

            {/* Reveal button */}
            <AnimatePresence>
              {allPlaced && !lineRevealed && (
                <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setLineRevealed(true)} aria-label={t('pattern.revealBtn')}
                  className="w-full py-3 rounded-2xl font-extrabold text-lg min-h-[52px]"
                  style={{ background: '#FCD34D', color: '#0F172A' }}>
                  {t('pattern.revealBtn')}
                </motion.button>
              )}
            </AnimatePresence>

            {/* Revealed equation */}
            <AnimatePresence>
              {lineRevealed && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl p-5 text-center"
                  style={{ background: '#1E293B', border: '2px solid #2DD4BF' }}>
                  <p className="text-slate-400 text-sm font-bold mb-2">{t('pattern.equationIs')}</p>
                  <p className="text-3xl font-black" style={{ color: '#2DD4BF' }}>
                    {buildEquation(patternSet.m, patternSet.b)}
                  </p>
                  <p className="text-slate-400 text-xs mt-3">
                    {t('pattern.slope')} = <span style={{ color: '#2DD4BF' }}>{fmt(patternSet.m)}</span>
                    {' '}&nbsp;|&nbsp;{' '}
                    {t('pattern.intercept')} = <span style={{ color: '#FCD34D' }}>{fmt(patternSet.b)}</span>
                  </p>
                  <button onClick={() => resetSet((setIdx + 1) % PATTERN_SETS.length)}
                    aria-label={t('pattern.nextLevel')}
                    className="mt-4 px-5 py-2 rounded-xl text-sm font-bold min-h-[44px]"
                    style={{ background: '#2DD4BF', color: '#0F172A' }}>
                    {t('pattern.nextLevel')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* How to play */}
            {!allPlaced && (
              <div className="rounded-2xl p-4" style={{ background: '#1E293B', border: '1px solid #334155' }}>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {t('pattern.howToPlay')}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">{t('pattern.howToPlayText')}</p>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
