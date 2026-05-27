import { useMemo } from 'react';
import { useTranslation } from '../i18n';

/**
 * useLinearFunction(m, b)
 * Returns derived data for y = mx + b, with descriptions in the active language.
 */
export function useLinearFunction(m, b) {
  const { t } = useTranslation();

  return useMemo(() => {
    const fmt = (n) => (Number.isInteger(n) ? n : parseFloat(n.toFixed(2)));
    const mVal = fmt(m);
    const bVal = fmt(b);

    // ── Equation string ────────────────────────────────────────────────────
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

    // ── Plain-language description ─────────────────────────────────────────
    let plainEnglish;
    if (m === 0) {
      plainEnglish = t('lineDesc.flat', { value: bVal });
    } else {
      const absM = Math.abs(mVal);
      const steps = absM === 1 ? t('lineDesc.step1') : t('lineDesc.stepN', { n: absM });
      plainEnglish = m > 0
        ? t('lineDesc.up',   { steps })
        : t('lineDesc.down', { steps });
    }

    const interceptText =
      b === 0
        ? t('lineDesc.interceptZero')
        : b > 0
        ? t('lineDesc.interceptPositive', { b: bVal })
        : t('lineDesc.interceptNegative', { b: bVal });

    // ── Table of 5 x/y pairs ──────────────────────────────────────────────
    const points = [-2, -1, 0, 1, 2].map((x) => ({
      x,
      y: parseFloat((m * x + b).toFixed(2)),
    }));

    return { equation, equationParts: { m: mVal, b: bVal }, plainEnglish, interceptText, points };
  }, [m, b, t]);
}
