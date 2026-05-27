import { motion, AnimatePresence } from 'framer-motion';

/**
 * Displays y = mx + b with animated color-coded values
 */
export default function LineEquationDisplay({ m, b }) {
  const fmt = (n) => {
    const v = Number.isInteger(n) ? n : parseFloat(n.toFixed(1));
    return v;
  };

  const mVal = fmt(m);
  const bVal = fmt(b);

  const renderM = () => {
    if (mVal === 1) return 'x';
    if (mVal === -1) return '−x';
    if (mVal === 0) return '';
    return `${mVal}x`;
  };

  const renderB = () => {
    if (mVal === 0) return `${bVal}`;
    if (bVal === 0) return '';
    if (bVal > 0) return ` + ${bVal}`;
    return ` − ${Math.abs(bVal)}`;
  };

  return (
    <div
      className="flex items-center justify-center gap-1 py-3 px-5 rounded-2xl"
      style={{ background: 'rgba(15,23,42,0.8)', border: '1.5px solid #334155' }}
      aria-label={`Equation: y equals ${mVal} x plus ${bVal}`}
    >
      <span className="text-3xl font-black text-white">y =</span>

      <AnimatePresence mode="popLayout">
        {mVal !== 0 && (
          <motion.span
            key={`m-${mVal}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="text-3xl font-black"
            style={{ color: '#2DD4BF' }}
          >
            {renderM()}
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence mode="popLayout">
        <motion.span
          key={`b-${bVal}-${mVal === 0}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className="text-3xl font-black"
          style={{ color: '#FCD34D' }}
        >
          {mVal === 0 ? `${bVal}` : renderB()}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
