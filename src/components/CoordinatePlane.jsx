import { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';

const AXIS_RANGE = 10;
const MARGIN = { top: 20, right: 20, bottom: 40, left: 40 };

export default function CoordinatePlane({
  m = 1,
  b = 0,
  showLine = true,
  showRiseRun = false,
  extraPoints = [],       // [{ x, y, color?, id? }]
  onPlaneClick = null,    // (mathX, mathY) => void
  highlightLine = false,  // quiz mode — glow the interactive line
  lineColor = '#2DD4BF',
  width: propWidth = null,
}) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const scalesRef = useRef({});

  // Build or update the SVG
  const draw = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const totalWidth = propWidth || container.clientWidth || 400;
    const totalHeight = Math.min(totalWidth * 0.85, 420);
    const w = totalWidth - MARGIN.left - MARGIN.right;
    const h = totalHeight - MARGIN.top - MARGIN.bottom;

    const xScale = d3.scaleLinear().domain([-AXIS_RANGE, AXIS_RANGE]).range([0, w]);
    const yScale = d3.scaleLinear().domain([-AXIS_RANGE, AXIS_RANGE]).range([h, 0]);
    scalesRef.current = { xScale, yScale, w, h };

    // ── Create or reuse SVG ──────────────────────────────────────────────
    let svg = d3.select(svgRef.current);
    const isNew = svg.select('g.root').empty();

    if (isNew) {
      svg = d3.select(svgRef.current)
        .attr('width', totalWidth)
        .attr('height', totalHeight);

      // Defs — clip path + glow filter + arrowhead marker
      const defs = svg.append('defs');
      defs.append('clipPath').attr('id', `clip-${svgRef.current._id}`)
        .append('rect').attr('x', 0).attr('y', 0).attr('width', w).attr('height', h);

      const filter = defs.append('filter').attr('id', `glow-${svgRef.current._id}`);
      filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'coloredBlur');
      const feMerge = filter.append('feMerge');
      feMerge.append('feMergeNode').attr('in', 'coloredBlur');
      feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

      defs.append('marker')
        .attr('id', `arrow-${svgRef.current._id}`)
        .attr('viewBox', '0 0 10 10')
        .attr('refX', 10).attr('refY', 5)
        .attr('markerWidth', 6).attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M 0 0 L 10 5 L 0 10 z')
        .attr('fill', '#94a3b8');

      const root = svg.append('g')
        .attr('class', 'root')
        .attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);

      // ── Grid ────────────────────────────────────────────────────────────
      const gridG = root.append('g').attr('class', 'grid');

      // Grid lines (skip i=0 — the dedicated axis lines cover x=0 and y=0)
      d3.range(-AXIS_RANGE, AXIS_RANGE + 1).forEach((i) => {
        if (i === 0) return;
        const isMajor = i % 5 === 0;
        const stroke = isMajor ? '#334155' : '#1E293B';
        const sw = isMajor ? 1 : 0.5;
        gridG.append('line')
          .attr('class', isMajor ? 'grid-major' : 'grid-minor')
          .attr('x1', xScale(i)).attr('y1', 0)
          .attr('x2', xScale(i)).attr('y2', h)
          .attr('stroke', stroke).attr('stroke-width', sw);
        gridG.append('line')
          .attr('class', isMajor ? 'grid-major' : 'grid-minor')
          .attr('x1', 0).attr('y1', yScale(i))
          .attr('x2', w).attr('y2', yScale(i))
          .attr('stroke', stroke).attr('stroke-width', sw);
      });

      // ── Axes ────────────────────────────────────────────────────────────
      const axesG = root.append('g').attr('class', 'axes');

      // X axis (left → right, arrow at positive end)
      axesG.append('line').attr('class', 'axis-line')
        .attr('x1', 0).attr('y1', yScale(0))
        .attr('x2', w).attr('y2', yScale(0))
        .attr('stroke', '#94a3b8').attr('stroke-width', 2)
        .attr('marker-end', `url(#arrow-${svgRef.current._id})`);
      // Y axis (bottom → top, arrow at positive end)
      axesG.append('line').attr('class', 'axis-line')
        .attr('x1', xScale(0)).attr('y1', h)
        .attr('x2', xScale(0)).attr('y2', 0)
        .attr('stroke', '#94a3b8').attr('stroke-width', 2)
        .attr('marker-end', `url(#arrow-${svgRef.current._id})`);

      // Tick marks + labels
      const tickG = root.append('g').attr('class', 'ticks');
      d3.range(-AXIS_RANGE, AXIS_RANGE + 1).forEach((i) => {
        if (i === 0) return;
        // X tick
        tickG.append('text')
          .attr('x', xScale(i))
          .attr('y', yScale(0) + 18)
          .attr('text-anchor', 'middle')
          .attr('font-size', 10)
          .attr('fill', '#64748b')
          .text(i % 5 === 0 || Math.abs(i) <= 3 ? i : '');
        // Y tick
        tickG.append('text')
          .attr('x', xScale(0) - 8)
          .attr('y', yScale(i) + 4)
          .attr('text-anchor', 'end')
          .attr('font-size', 10)
          .attr('fill', '#64748b')
          .text(i % 5 === 0 || Math.abs(i) <= 3 ? i : '');
      });

      // Axis labels
      root.append('text')
        .attr('x', w - 8).attr('y', yScale(0) - 8)
        .attr('fill', '#94a3b8').attr('font-size', 13).attr('font-weight', 700)
        .text('x');
      root.append('text')
        .attr('x', xScale(0) + 8).attr('y', 12)
        .attr('fill', '#94a3b8').attr('font-size', 13).attr('font-weight', 700)
        .text('y');

      // Origin dot
      root.append('circle')
        .attr('cx', xScale(0)).attr('cy', yScale(0))
        .attr('r', 3).attr('fill', '#64748b');

      // ── Line group (drawn last so it's on top of grid) ───────────────
      root.append('g').attr('class', 'line-group')
        .attr('clip-path', `url(#clip-${svgRef.current._id})`);

      // ── Rise/run group ───────────────────────────────────────────────
      root.append('g').attr('class', 'rise-run-group')
        .attr('clip-path', `url(#clip-${svgRef.current._id})`);

      // ── Extra points group ───────────────────────────────────────────
      root.append('g').attr('class', 'points-group')
        .attr('clip-path', `url(#clip-${svgRef.current._id})`);

      // ── Click overlay ────────────────────────────────────────────────
      if (onPlaneClick) {
        root.append('rect')
          .attr('class', 'click-overlay')
          .attr('x', 0).attr('y', 0)
          .attr('width', w).attr('height', h)
          .attr('fill', 'transparent')
          .attr('cursor', 'crosshair')
          .on('click', function (event) {
            const [px, py] = d3.pointer(event);
            const mathX = Math.round(xScale.invert(px));
            const mathY = Math.round(yScale.invert(py));
            if (mathX >= -AXIS_RANGE && mathX <= AXIS_RANGE &&
                mathY >= -AXIS_RANGE && mathY <= AXIS_RANGE) {
              onPlaneClick(mathX, mathY);
            }
          });
      }
    } else {
      // Resize only
      svg.attr('width', totalWidth).attr('height', totalHeight);
    }

    const root = svg.select('g.root');

    // ── Update the line ──────────────────────────────────────────────────
    const lineGroup = root.select('g.line-group');

    if (showLine) {
      // Clamp y to visible range for line endpoints
      let x1 = -AXIS_RANGE, x2 = AXIS_RANGE;
      let y1 = m * x1 + b, y2 = m * x2 + b;

      // Clip
      if (m !== 0) {
        const xAtYmin = (-AXIS_RANGE - b) / m;
        const xAtYmax = (AXIS_RANGE - b) / m;
        x1 = Math.max(-AXIS_RANGE, Math.min(AXIS_RANGE, Math.min(xAtYmin, xAtYmax)));
        x2 = Math.max(-AXIS_RANGE, Math.min(AXIS_RANGE, Math.max(xAtYmin, xAtYmax)));
        y1 = m * x1 + b;
        y2 = m * x2 + b;
      } else {
        y1 = Math.max(-AXIS_RANGE, Math.min(AXIS_RANGE, b));
        y2 = y1;
      }

      let line = lineGroup.select('line.main-line');
      const isNewLine = line.empty();

      if (isNewLine) {
        // Place immediately on first render — no transition — so the line
        // starts at its correct position rather than flying in from (0,0).
        line = lineGroup.append('line')
          .attr('class', 'main-line')
          .attr('stroke-linecap', 'round')
          .attr('x1', xScale(x1)).attr('y1', yScale(y1))
          .attr('x2', xScale(x2)).attr('y2', yScale(y2));
      }

      line
        .attr('stroke', lineColor)
        .attr('stroke-width', highlightLine ? 3 : 2.5)
        .attr('filter', `url(#glow-${svgRef.current._id})`);

      // Transition position on every update (no-op on first render since
      // the values are already set above).
      line
        .transition().duration(300)
        .attr('x1', xScale(x1)).attr('y1', yScale(y1))
        .attr('x2', xScale(x2)).attr('y2', yScale(y2));
    } else {
      lineGroup.select('line.main-line').remove();
    }

    // ── Rise/Run triangles ───────────────────────────────────────────────
    const rrGroup = root.select('g.rise-run-group');
    rrGroup.selectAll('*').remove();

    if (showRiseRun && m !== 0 && showLine) {
      const runStart = 1;
      const runEnd = runStart + 1;
      const riseStart = m * runStart + b;
      const riseEnd = m * runEnd + b;

      // Horizontal run line
      rrGroup.append('line')
        .attr('x1', xScale(runStart)).attr('y1', yScale(riseStart))
        .attr('x2', xScale(runEnd)).attr('y2', yScale(riseStart))
        .attr('stroke', '#FCD34D').attr('stroke-width', 2)
        .attr('stroke-dasharray', '4,3');

      // Vertical rise line
      rrGroup.append('line')
        .attr('x1', xScale(runEnd)).attr('y1', yScale(riseStart))
        .attr('x2', xScale(runEnd)).attr('y2', yScale(riseEnd))
        .attr('stroke', m > 0 ? '#34d399' : '#f87171').attr('stroke-width', 2)
        .attr('stroke-dasharray', '4,3');

      // Labels
      rrGroup.append('text')
        .attr('x', xScale(runStart + 0.5))
        .attr('y', yScale(riseStart) + 16)
        .attr('text-anchor', 'middle')
        .attr('font-size', 11).attr('font-weight', 700)
        .attr('fill', '#FCD34D')
        .text('run = 1');

      rrGroup.append('text')
        .attr('x', xScale(runEnd) + 26)
        .attr('y', yScale((riseStart + riseEnd) / 2) + 4)
        .attr('text-anchor', 'start')
        .attr('font-size', 11).attr('font-weight', 700)
        .attr('fill', m > 0 ? '#34d399' : '#f87171')
        .text(`rise = ${parseFloat(m.toFixed(2))}`);

      // Corner dot
      rrGroup.append('circle')
        .attr('cx', xScale(runEnd)).attr('cy', yScale(riseStart))
        .attr('r', 3).attr('fill', '#FCD34D');
    }

    // ── Extra points ─────────────────────────────────────────────────────
    const pointsGroup = root.select('g.points-group');
    const pts = pointsGroup.selectAll('g.extra-pt').data(extraPoints, (d) => d.id ?? `${d.x},${d.y}`);

    pts.enter().append('g')
      .attr('class', 'extra-pt')
      .each(function (d) {
        const g = d3.select(this);
        // Pulse ring
        g.append('circle')
          .attr('cx', xScale(d.x)).attr('cy', yScale(d.y))
          .attr('r', 14).attr('fill', 'none')
          .attr('stroke', d.color || '#2DD4BF')
          .attr('stroke-width', 1.5)
          .attr('opacity', 0.6)
          .transition().duration(600)
          .attr('r', 20).attr('opacity', 0)
          .remove();
        // Main dot
        g.append('circle')
          .attr('cx', xScale(d.x)).attr('cy', yScale(d.y))
          .attr('r', 0).attr('fill', d.color || '#2DD4BF')
          .attr('stroke', 'white').attr('stroke-width', 1.5)
          .transition().duration(400).ease(d3.easeBounceOut)
          .attr('r', 7);
      });

    pts.each(function (d) {
      d3.select(this).select('circle:last-child')
        .attr('cx', xScale(d.x)).attr('cy', yScale(d.y));
    });

    pts.exit().remove();
  }, [m, b, showLine, showRiseRun, extraPoints, onPlaneClick, lineColor, highlightLine, propWidth]);

  // Assign a unique id to the svg element for clip-path references
  useEffect(() => {
    if (svgRef.current && !svgRef.current._id) {
      svgRef.current._id = Math.random().toString(36).slice(2);
    }
  }, []);

  useEffect(() => {
    draw();
  }, [draw]);

  // Resize observer
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => {
      // Clear SVG and redraw on resize
      if (svgRef.current) {
        d3.select(svgRef.current).selectAll('*').remove();
      }
      draw();
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [draw]);

  return (
    <div ref={containerRef} className="w-full" style={{ cursor: onPlaneClick ? 'crosshair' : 'default' }}>
      <svg ref={svgRef} style={{ display: 'block', width: '100%' }} />
    </div>
  );
}
