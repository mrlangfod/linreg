// ─── Story Mode Challenges ──────────────────────────────────────────────────
export const STORY_CHALLENGES = [
  {
    id: 1,
    emoji: '🍕',
    title: 'Pizza Party',
    problem:
      'A pizza costs $5 plus $2 per topping. If x = number of toppings and y = total price in dollars, what does the line look like?',
    hint_slope: 'Think about how the price changes for each extra topping.',
    hint_intercept: 'What does a pizza with ZERO toppings cost?',
    m: 2,
    b: 5,
    tolerance: 0.3,
    xLabel: 'Toppings',
    yLabel: 'Price ($)',
    xRange: [0, 8],
    yRange: [0, 20],
  },
  {
    id: 2,
    emoji: '🕯️',
    title: 'Burning Candle',
    problem:
      'A candle is 10 cm tall and burns down 1 cm every hour. If x = hours passed and y = candle height (cm), graph the candle\'s height over time.',
    hint_slope: 'The candle is getting shorter — should the slope be positive or negative?',
    hint_intercept: 'At time zero, how tall is the candle?',
    m: -1,
    b: 10,
    tolerance: 0.3,
    xLabel: 'Hours',
    yLabel: 'Height (cm)',
    xRange: [0, 10],
    yRange: [0, 12],
  },
  {
    id: 3,
    emoji: '🚗',
    title: 'Road Trip Rental',
    problem:
      'Renting a car costs $20 per day plus a flat $15 registration fee. If x = days rented and y = total cost ($), graph the total cost.',
    hint_slope: 'How much more does it cost for each extra day?',
    hint_intercept: 'Even for 0 days, you still pay a fee. What is it?',
    m: 20,
    b: 15,
    tolerance: 1,
    xLabel: 'Days',
    yLabel: 'Cost ($)',
    xRange: [0, 6],
    yRange: [0, 150],
  },
  {
    id: 4,
    emoji: '💰',
    title: 'Spending Money',
    problem:
      'You have $50 in your piggy bank and spend $5 each day. If x = days and y = money left ($), graph how your savings change.',
    hint_slope: 'You\'re spending money, so your balance goes down. Negative slope!',
    hint_intercept: 'On day zero, how much money do you have?',
    m: -5,
    b: 50,
    tolerance: 0.5,
    xLabel: 'Days',
    yLabel: 'Money ($)',
    xRange: [0, 10],
    yRange: [0, 60],
  },
  {
    id: 5,
    emoji: '🌱',
    title: 'Growing Plant',
    problem:
      'A plant is 2 cm tall and grows 3 cm every week. If x = weeks and y = height (cm), graph the plant\'s growth.',
    hint_slope: 'How many centimetres does it grow each week?',
    hint_intercept: 'Before any weeks pass, how tall is the plant?',
    m: 3,
    b: 2,
    tolerance: 0.3,
    xLabel: 'Weeks',
    yLabel: 'Height (cm)',
    xRange: [0, 8],
    yRange: [0, 30],
  },
];

// ─── Pattern Builder Point Sets ─────────────────────────────────────────────
export const PATTERN_SETS = [
  {
    id: 1,
    label: 'Level 1 – Easy',
    m: 1,
    b: 0,
    points: [
      { x: -2, y: -2 },
      { x: -1, y: -1 },
      { x: 0,  y: 0  },
      { x: 1,  y: 1  },
      { x: 2,  y: 2  },
      { x: 3,  y: 3  },
    ],
  },
  {
    id: 2,
    label: 'Level 2 – Medium',
    m: 2,
    b: 1,
    points: [
      { x: -2, y: -3 },
      { x: -1, y: -1 },
      { x: 0,  y: 1  },
      { x: 1,  y: 3  },
      { x: 2,  y: 5  },
      { x: 3,  y: 7  },
    ],
  },
  {
    id: 3,
    label: 'Level 3 – Hard',
    m: -1.5,
    b: 3,
    points: [
      { x: -2, y: 6   },
      { x: 0,  y: 3   },
      { x: 2,  y: 0   },
      { x: 4,  y: -3  },
      { x: -4, y: 9   },
      { x: 6,  y: -6  },
    ],
  },
  {
    id: 4,
    label: 'Level 4 – Expert',
    m: 0.5,
    b: -2,
    points: [
      { x: -4, y: -4 },
      { x: -2, y: -3 },
      { x: 0,  y: -2 },
      { x: 2,  y: -1 },
      { x: 4,  y: 0  },
      { x: 6,  y: 1  },
    ],
  },
];

// ─── Quiz Questions ──────────────────────────────────────────────────────────
export const QUIZ_QUESTIONS = [
  // FORMAT A: Show graph → pick equation
  {
    id: 1,
    type: 'graphToEquation',
    m: 2,
    b: 1,
    options: ['y = 2x + 1', 'y = x + 2', 'y = 2x − 1', 'y = 3x + 1'],
    correct: 0,
  },
  // FORMAT B: Show equation → adjust line
  {
    id: 2,
    type: 'equationToLine',
    m: -1,
    b: 3,
    equation: 'y = −x + 3',
    tolerance: 0.4,
  },
  // FORMAT A
  {
    id: 3,
    type: 'graphToEquation',
    m: 0,
    b: 4,
    options: ['y = 4x', 'y = x + 4', 'y = 4', 'y = 0x − 4'],
    correct: 2,
  },
  // FORMAT B
  {
    id: 4,
    type: 'equationToLine',
    m: 3,
    b: -2,
    equation: 'y = 3x − 2',
    tolerance: 0.4,
  },
  // FORMAT A
  {
    id: 5,
    type: 'graphToEquation',
    m: -2,
    b: 0,
    options: ['y = 2x', 'y = −2x', 'y = x − 2', 'y = −2x + 2'],
    correct: 1,
  },
  // FORMAT B
  {
    id: 6,
    type: 'equationToLine',
    m: 1,
    b: -3,
    equation: 'y = x − 3',
    tolerance: 0.4,
  },
  // FORMAT A
  {
    id: 7,
    type: 'graphToEquation',
    m: 0.5,
    b: 2,
    options: ['y = 2x + ½', 'y = ½x − 2', 'y = ½x + 2', 'y = x + 0.5'],
    correct: 2,
  },
  // FORMAT B
  {
    id: 8,
    type: 'equationToLine',
    m: -0.5,
    b: 1,
    equation: 'y = −½x + 1',
    tolerance: 0.4,
  },
];
