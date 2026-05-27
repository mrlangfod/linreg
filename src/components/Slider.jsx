/**
 * Slider component — labelled range input with current value display
 */
export default function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  color = '#2DD4BF',
  unit = '',
  ariaLabel,
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between items-center">
        <label
          className="text-sm font-bold"
          style={{ color }}
        >
          {label}
        </label>
        <span
          className="text-lg font-extrabold tabular-nums min-w-[3rem] text-right"
          style={{ color }}
        >
          {Number.isInteger(value) ? value : value.toFixed(1)}{unit}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          aria-label={ariaLabel || label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          className="w-full"
          style={{
            background: `linear-gradient(to right, ${color} ${pct}%, #334155 ${pct}%)`,
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-500">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
