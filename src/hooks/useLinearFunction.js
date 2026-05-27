import { useMemo } from 'react';

/**
 * useLinearFunction(m, b)
 * Returns derived data for the linear function y = mx + b
 */
export function useLinearFunction(m, b) {
  return useMemo(() => {
    // Equation string
    const formatNum = (n) => {
      if (Number.isInteger(n)) return n;
      return parseFloat(n.toFixed(2));
    };

    const mVal = formatNum(m);
    const bVal = formatNum(b);

    let equation = 'y = ';
    if (mVal === 0) {
      equation += `${bVal}`;
    } else if (mVal === 1) {
      equation += 'x';
      if (bVal !== 0) equation += bVal > 0 ? ` + ${bVal}` : ` − ${Math.abs(bVal)}`;
    } else if (mVal === -1) {
      equation += '−x';
      if (bVal !== 0) equation += bVal > 0 ? ` + ${bVal}` : ` − ${Math.abs(bVal)}`;
    } else {
      equation += `${mVal}x`;
      if (bVal !== 0) equation += bVal > 0 ? ` + ${bVal}` : ` − ${Math.abs(bVal)}`;
    }

    // Plain English description
    let plainEnglish = '';
    if (m === 0) {
      plainEnglish = `This is a flat (horizontal) line. It doesn't go up or down — y is always ${bVal}.`;
    } else if (m > 0) {
      const riseText = m === 1 ? '1 step' : `${mVal} steps`;
      plainEnglish = `For every step to the right, the line goes UP ${riseText}.`;
    } else {
      const riseText = Math.abs(m) === 1 ? '1 step' : `${Math.abs(mVal)} steps`;
      plainEnglish = `For every step to the right, the line goes DOWN ${riseText}.`;
    }

    const interceptText =
      b === 0
        ? 'The line passes right through the origin (0, 0).'
        : b > 0
        ? `The line crosses the y-axis at +${bVal}.`
        : `The line crosses the y-axis at ${bVal}.`;

    // Table of 5 x/y pairs
    const tableXValues = [-2, -1, 0, 1, 2];
    const points = tableXValues.map((x) => ({
      x,
      y: parseFloat((m * x + b).toFixed(2)),
    }));

    // Extended points for drawing the line across -10 to 10
    const linePoints = [-10, 10].map((x) => ({
      x,
      y: m * x + b,
    }));

    return {
      equation,
      equationParts: { m: mVal, b: bVal },
      plainEnglish,
      interceptText,
      points,
      linePoints,
    };
  }, [m, b]);
}
