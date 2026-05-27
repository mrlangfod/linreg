# 📈 LineLab — Linear Functions Explorer

An interactive web app for teaching linear functions (y = mx + b) to middle-school students. Built to be visually engaging and fun without being childish — bright colours, smooth animations, and real-world problems that make the maths feel meaningful.

🌐 **Live app:** [mrlangfod.github.io/linelab](https://mrlangfod.github.io/linelab/)

---

## Features

### 🔭 Explore Mode
Drag two sliders — **slope (m)** and **y-intercept (b)** — and watch the line animate smoothly on a D3-powered coordinate plane in real time.

- Animated rise/run triangle visualises what slope actually means
- Plain-English (or plain-Danish/German) description updates live: *"For every step to the right, the line goes UP 2 steps"*
- Colour-coded equation display: **y = 2x + 3**
- Value table showing five x/y pairs that update with every slider move
- Toggle to show/hide the rise/run scaffold

### 📖 Story Challenges
Five real-world word problems that give linear functions context and meaning:

| # | Story | Function |
|---|-------|----------|
| 1 | 🍕 Pizza pricing | y = 2x + 5 |
| 2 | 🕯️ Burning candle | y = −x + 10 |
| 3 | 🚗 Car rental cost | y = 20x + 15 |
| 4 | 💰 Spending savings | y = −5x + 50 |
| 5 | 🌱 Growing plant | y = 3x + 2 |

Students adjust slope and intercept sliders to match the described function. On a correct answer: confetti 🎉. On a wrong answer: a targeted hint (*"Your starting point is right, but try a different slope!"*). Progress is tracked across all five challenges.

### 🔢 Pattern Builder
A table of six coordinate pairs is shown. Students click the matching points on the graph to plot them one by one (each animates in with a bounce). Once all six are placed, a **Reveal Line** button animates the best-fit line drawing through the points and shows the equation.

Difficulty scales across four levels by progressively removing the dashed-circle position hints:

| Level | Hints shown |
|-------|-------------|
| 1 – Easy | All 6 circles visible |
| 2 – Medium | First 4 visible |
| 3 – Hard | First 2 visible |
| 4 – Expert | No hints at all |

### 🕵️ Line Detective (Quiz)
Eight questions in two alternating formats:

- **Graph → Equation** — a line is plotted; pick the correct equation from four options
- **Equation → Line** — an equation is shown; drag sliders to position the line to match

Immediate feedback after each answer. A score tracker is shown throughout. The end screen shows a score out of 8, a 1–3 star rating, and a replay button.

---

## Internationalisation

The app ships with three languages, switchable via the flag buttons in the header. The selected language persists across sessions.

| Flag | Language | Default |
|------|----------|---------|
| 🇩🇰 | Dansk (Danish) | ✅ |
| 🇬🇧 | English | |
| 🇩🇪 | Deutsch (German) | |

All UI strings, story challenge text, hints, and plain-language descriptions are fully translated. Adding a new language requires only a new file in `src/i18n/` and one entry in `LanguageSwitcher.jsx`.

---

## Tech Stack

| Tool | Role |
|------|------|
| [React 19](https://react.dev) | UI framework |
| [Vite 8](https://vite.dev) | Build tool & dev server |
| [D3.js v7](https://d3js.org) | SVG coordinate plane & line rendering |
| [Framer Motion 12](https://www.framer.com/motion/) | Animations & transitions |
| [Tailwind CSS v4](https://tailwindcss.com) | Layout & utility styling |

No backend, no router — all state lives in React.

---

## Project Structure

```
src/
├── App.jsx                      # Root — mode state, language provider
├── index.css                    # Tailwind + global styles
├── constants.js                 # Mathematical challenge data (m, b, points, tolerances)
├── i18n/
│   ├── index.jsx                # LanguageProvider, useTranslation() hook
│   ├── en.js                    # English strings
│   ├── da.js                    # Danish strings
│   └── de.js                    # German strings
├── hooks/
│   └── useLinearFunction.js     # Derives equation, descriptions & value table from m, b
└── components/
    ├── ModeNav.jsx              # Top tab bar with animated active pill
    ├── LanguageSwitcher.jsx     # 🇩🇰 🇬🇧 🇩🇪 flag buttons
    ├── CoordinatePlane.jsx      # Reusable D3 SVG graph (responsive, clipped, glowing)
    ├── LineEquationDisplay.jsx  # Animated colour-coded y = mx + b display
    ├── Slider.jsx               # Gradient range input with live value label
    ├── Confetti.jsx             # CSS confetti burst on correct answer
    ├── ExploreMode.jsx          # Mode 1
    ├── StoryMode.jsx            # Mode 2
    ├── PatternMode.jsx          # Mode 3
    └── QuizMode.jsx             # Mode 4
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build
```

Requires Node.js 18+.

---

## Design

- **Colour palette:** deep navy `#0F172A` · teal `#2DD4BF` · yellow `#FCD34D`
- **Font:** [Nunito](https://fonts.google.com/specimen/Nunito) (Google Fonts)
- **Coordinate plane:** dark grid, glowing teal line, D3 transitions at 300 ms
- **Accessibility:** all controls have `aria-label`, feedback uses `role="alert"`, colour is never the only indicator of correctness
- **Mobile:** graph stacks above controls on small screens; all touch targets ≥ 44 px
