const en = {
  // ─── App shell ────────────────────────────────────────────────────────────
  app: {
    title: 'LineLab',
    subtitle: 'Linear Functions Explorer',
    footer: 'LineLab — Learn linear functions the fun way 📐',
  },

  // ─── Mode nav ─────────────────────────────────────────────────────────────
  nav: {
    explore: 'Explore',
    stories: 'Stories',
    patterns: 'Patterns',
    detective: 'Detective',
  },

  // ─── Explore mode ─────────────────────────────────────────────────────────
  explore: {
    title: '🔭 Explore Mode',
    subtitle: 'Drag the sliders and watch the line move in real time!',
    slope: 'Slope (m)',
    intercept: 'Y-intercept (b)',
    slopeAria: 'Adjust slope m',
    interceptAria: 'Adjust y-intercept b',
    showRiseRun: 'Show rise/run',
    showRiseRunAria: 'Show rise/run triangle',
    whatMeans: 'What does this mean?',
    valueTable: 'Value Table',
    facts: {
      slopeTitle: 'Slope (m)',
      slopeText: 'How steep the line is. Positive = goes up. Negative = goes down. Zero = flat.',
      interceptTitle: 'Y-intercept (b)',
      interceptText: 'Where the line crosses the y-axis — the starting value when x = 0.',
      linearTitle: 'Linear',
      linearText: 'A straight line! Same change in y for every equal step in x.',
    },
  },

  // ─── Plain-English line descriptions (used by useLinearFunction) ──────────
  lineDesc: {
    up: 'For every step to the right, the line goes UP {steps}.',
    down: 'For every step to the right, the line goes DOWN {steps}.',
    flat: "This is a flat (horizontal) line. It doesn't go up or down — y is always {value}.",
    step1: '1 step',
    stepN: '{n} steps',
    interceptPositive: 'The line crosses the y-axis at +{b}.',
    interceptNegative: 'The line crosses the y-axis at {b}.',
    interceptZero: 'The line passes right through the origin (0, 0).',
  },

  // ─── Story mode ───────────────────────────────────────────────────────────
  story: {
    title: '📖 Story Challenges',
    subtitle: 'Real-world problems — adjust the line to match!',
    done: 'done',
    adjustLine: 'Adjust your line',
    challengeOf: 'Challenge {n} of {total}',
    checkAnswer: '🎯 Check Answer',
    correct: '✓ Correct!',
    hintLabel: '💡 Hint',
    successTitle: 'Amazing work!',
    successLine: 'The line was y = {m}x {b}',
    wrongTitle: 'Not quite!',
    prev: '← Prev',
    next: 'Next →',
    challenges: {
      1: {
        title: 'Pizza Party',
        problem:
          'A pizza costs $5 plus $2 per topping. If x = number of toppings and y = total price in dollars, what does the line look like?',
        hint_slope: 'Think about how the price changes for each extra topping.',
        hint_intercept: 'What does a pizza with ZERO toppings cost?',
      },
      2: {
        title: 'Burning Candle',
        problem:
          "A candle is 10 cm tall and burns down 1 cm every hour. If x = hours passed and y = candle height (cm), graph the candle's height over time.",
        hint_slope: 'The candle is getting shorter — should the slope be positive or negative?',
        hint_intercept: 'At time zero, how tall is the candle?',
      },
      3: {
        title: 'Road Trip Rental',
        problem:
          'Renting a car costs $20 per day plus a flat $15 registration fee. If x = days rented and y = total cost ($), graph the total cost.',
        hint_slope: 'How much more does it cost for each extra day?',
        hint_intercept: 'Even for 0 days, you still pay a fee. What is it?',
      },
      4: {
        title: 'Spending Money',
        problem:
          "You have $50 in your piggy bank and spend $5 each day. If x = days and y = money left ($), graph how your savings change.",
        hint_slope: "You're spending money, so your balance goes down. Negative slope!",
        hint_intercept: 'On day zero, how much money do you have?',
      },
      5: {
        title: 'Growing Plant',
        problem:
          'A plant is 2 cm tall and grows 3 cm every week. If x = weeks and y = height (cm), graph the plant\'s growth.',
        hint_slope: 'How many centimetres does it grow each week?',
        hint_intercept: 'Before any weeks pass, how tall is the plant?',
      },
    },
  },

  // ─── Pattern mode ─────────────────────────────────────────────────────────
  pattern: {
    title: '🔢 Pattern Builder',
    subtitle: 'Click the points shown on the graph to plot them, then reveal the line!',
    pointsToPlot: 'Points to Plot',
    progress: 'Progress',
    revealBtn: '✨ Reveal the Line!',
    equationIs: 'The equation is:',
    nextLevel: 'Try Next Level →',
    howToPlay: 'How to play',
    howToPlayText:
      'Click on the coordinate plane where you see the dashed circles to place each point. Match all 6!',
    slope: 'Slope',
    intercept: 'Intercept',
    levels: {
      1: 'Level 1 – Easy',
      2: 'Level 2 – Medium',
      3: 'Level 3 – Hard',
      4: 'Level 4 – Expert',
    },
  },

  // ─── Quiz mode ────────────────────────────────────────────────────────────
  quiz: {
    title: '🕵️ Line Detective',
    subtitle: "Quiz time — can you crack the code?",
    scoreAria: 'Score: {correct} out of {total}',
    questionOf: 'Question {n} of {total}',
    formatA: 'Graph → Equation',
    formatB: 'Equation → Line',
    formatAInstruction: 'What is the equation of this line?',
    formatBInstruction: 'Adjust the line to match this equation:',
    submit: '🎯 Submit Answer',
    nextQuestion: 'Next Question →',
    seeResults: '🏁 See Results',
    correctLabel: 'Correct!',
    wrongLabel: 'Not quite!',
    wrongAnswer: 'Answer: m = {m}, b = {b}',
    endTitle: 'Case Closed!',
    endYourScore: 'Your Score',
    endBrilliant: 'Brilliant detective work! 🌟',
    endGood: 'Great job! Keep practising! 💪',
    endKeepGoing: "Keep going — you'll crack it! 🔍",
    playAgain: '🔄 Play Again',
    playAgainAria: 'Play again',
    stars: '{stars} out of 3 stars',
  },
};

export default en;
