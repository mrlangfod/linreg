import { useEffect, useRef } from 'react';

const COLORS = ['#2DD4BF', '#FCD34D', '#f472b6', '#a78bfa', '#34d399', '#fb923c'];

export default function Confetti({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const pieces = 80;

    for (let i = 0; i < pieces; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-particle';
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const size = 6 + Math.random() * 8;
      const left = Math.random() * 100;
      const delay = Math.random() * 0.6;
      const duration = 1.5 + Math.random() * 1.5;
      const shape = Math.random() > 0.5 ? '50%' : '0%';

      el.style.cssText = `
        left: ${left}%;
        top: -20px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: ${shape};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
      `;

      container.appendChild(el);

      const total = (delay + duration) * 1000 + 200;
      setTimeout(() => el.remove(), total);
    }
  }, [active]);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50" />;
}
