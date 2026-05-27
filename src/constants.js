// ─── Story Mode Challenges ─── (text lives in src/i18n/{lang}.js story.challenges)
export const STORY_CHALLENGES = [
  { id: 1, emoji: '🍕', m: 2,   b: 5,  tolerance: 0.3 },
  { id: 2, emoji: '🕯️', m: -1,  b: 10, tolerance: 0.3 },
  { id: 3, emoji: '🚗', m: 20,  b: 15, tolerance: 1   },
  { id: 4, emoji: '💰', m: -5,  b: 50, tolerance: 0.5 },
  { id: 5, emoji: '🌱', m: 3,   b: 2,  tolerance: 0.3 },
];

// ─── Pattern Builder Point Sets ─── (labels live in src/i18n/{lang}.js pattern.levels)
export const PATTERN_SETS = [
  {
    id: 1,
    m: 1,
    b: 0,
    points: [
      { x: -2, y: -2 }, { x: -1, y: -1 }, { x: 0, y: 0 },
      { x: 1,  y: 1  }, { x: 2,  y: 2  }, { x: 3, y: 3 },
    ],
  },
  {
    id: 2,
    m: 2,
    b: 1,
    points: [
      { x: -2, y: -3 }, { x: -1, y: -1 }, { x: 0, y: 1 },
      { x: 1,  y: 3  }, { x: 2,  y: 5  }, { x: 3, y: 7 },
    ],
  },
  {
    id: 3,
    m: -1.5,
    b: 3,
    points: [
      { x: -2, y: 6  }, { x: 0,  y: 3  }, { x: 2,  y: 0  },
      { x: 4,  y: -3 }, { x: -4, y: 9  }, { x: 6,  y: -6 },
    ],
  },
  {
    id: 4,
    m: 0.5,
    b: -2,
    points: [
      { x: -4, y: -4 }, { x: -2, y: -3 }, { x: 0, y: -2 },
      { x: 2,  y: -1 }, { x: 4,  y: 0  }, { x: 6, y: 1  },
    ],
  },
];

// ─── Quiz Questions ─── (equations are math notation — language-neutral)
export const QUIZ_QUESTIONS = [
  { id: 1, type: 'graphToEquation', m: 2,    b: 1,  options: ['y = 2x + 1', 'y = x + 2', 'y = 2x − 1', 'y = 3x + 1'],       correct: 0 },
  { id: 2, type: 'equationToLine',  m: -1,   b: 3,  equation: 'y = −x + 3',  tolerance: 0.4 },
  { id: 3, type: 'graphToEquation', m: 0,    b: 4,  options: ['y = 4x', 'y = x + 4', 'y = 4', 'y = 0x − 4'],                 correct: 2 },
  { id: 4, type: 'equationToLine',  m: 3,    b: -2, equation: 'y = 3x − 2',  tolerance: 0.4 },
  { id: 5, type: 'graphToEquation', m: -2,   b: 0,  options: ['y = 2x', 'y = −2x', 'y = x − 2', 'y = −2x + 2'],             correct: 1 },
  { id: 6, type: 'equationToLine',  m: 1,    b: -3, equation: 'y = x − 3',   tolerance: 0.4 },
  { id: 7, type: 'graphToEquation', m: 0.5,  b: 2,  options: ['y = 2x + ½', 'y = ½x − 2', 'y = ½x + 2', 'y = x + 0.5'],    correct: 2 },
  { id: 8, type: 'equationToLine',  m: -0.5, b: 1,  equation: 'y = −½x + 1', tolerance: 0.4 },
];
