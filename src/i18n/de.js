const de = {
  // ─── App shell ────────────────────────────────────────────────────────────
  app: {
    title: 'LineLab',
    subtitle: 'Entdecker für lineare Funktionen',
    footer: 'LineLab — Lerne lineare Funktionen auf die spaßige Art 📐',
  },

  // ─── Mode nav ─────────────────────────────────────────────────────────────
  nav: {
    explore: 'Entdecken',
    stories: 'Geschichten',
    patterns: 'Muster',
    detective: 'Detektiv',
  },

  // ─── Explore mode ─────────────────────────────────────────────────────────
  explore: {
    title: '🔭 Entdeckungsmodus',
    subtitle: 'Ziehe die Regler und beobachte, wie sich die Gerade in Echtzeit bewegt!',
    slope: 'Steigung (m)',
    intercept: 'Y-Achsenabschnitt (b)',
    slopeAria: 'Steigung m anpassen',
    interceptAria: 'Y-Achsenabschnitt b anpassen',
    showRiseRun: 'Steigung/Lauf anzeigen',
    showRiseRunAria: 'Steigung/Lauf-Dreieck anzeigen',
    whatMeans: 'Was bedeutet das?',
    valueTable: 'Wertetabelle',
    facts: {
      slopeTitle: 'Steigung (m)',
      slopeText: 'Wie steil die Gerade ist. Positiv = geht hoch. Negativ = geht runter. Null = waagerecht.',
      interceptTitle: 'Y-Achsenabschnitt (b)',
      interceptText: 'Wo die Gerade die y-Achse schneidet — der Startwert wenn x = 0.',
      linearTitle: 'Linear',
      linearText: 'Eine gerade Linie! Gleiche Änderung in y für jeden gleichen Schritt in x.',
    },
  },

  // ─── Plain-German line descriptions ───────────────────────────────────────
  lineDesc: {
    up: 'Für jeden Schritt nach rechts geht die Gerade {steps} nach OBEN.',
    down: 'Für jeden Schritt nach rechts geht die Gerade {steps} nach UNTEN.',
    flat: 'Dies ist eine waagerechte Gerade. Sie geht weder hoch noch runter — y ist immer {value}.',
    step1: '1 Schritt',
    stepN: '{n} Schritte',
    interceptPositive: 'Die Gerade schneidet die y-Achse bei +{b}.',
    interceptNegative: 'Die Gerade schneidet die y-Achse bei {b}.',
    interceptZero: 'Die Gerade verläuft genau durch den Ursprung (0, 0).',
  },

  // ─── Story mode ───────────────────────────────────────────────────────────
  story: {
    title: '📖 Geschichtenaufgaben',
    subtitle: 'Alltagsprobleme — passe die Gerade an!',
    done: 'geschafft',
    adjustLine: 'Passe deine Gerade an',
    challengeOf: 'Aufgabe {n} von {total}',
    checkAnswer: '🎯 Antwort prüfen',
    correct: '✓ Richtig!',
    hintLabel: '💡 Hinweis',
    successTitle: 'Fantastische Arbeit!',
    successLine: 'Die Gerade war y = {m}x {b}',
    wrongTitle: 'Nicht ganz!',
    prev: '← Zurück',
    next: 'Weiter →',
    challenges: {
      1: {
        title: 'Pizza-Party',
        problem:
          'Eine Pizza kostet 5 $ plus 2 $ pro Belag. Wenn x = Anzahl der Beläge und y = Gesamtpreis in Dollar ist, wie sieht die Gerade aus?',
        hint_slope: 'Überlege, wie sich der Preis für jeden zusätzlichen Belag ändert.',
        hint_intercept: 'Was kostet eine Pizza mit NULL Belägen?',
      },
      2: {
        title: 'Brennende Kerze',
        problem:
          'Eine Kerze ist 10 cm groß und brennt jede Stunde 1 cm herunter. Wenn x = vergangene Stunden und y = Kerzenhöhe (cm), zeichne die Höhe der Kerze über die Zeit.',
        hint_slope: 'Die Kerze wird kürzer — sollte die Steigung positiv oder negativ sein?',
        hint_intercept: 'Wie groß ist die Kerze zum Zeitpunkt null?',
      },
      3: {
        title: 'Autovermietung',
        problem:
          'Ein Auto zu mieten kostet 20 $ pro Tag plus eine einmalige Anmeldegebühr von 15 $. Wenn x = gemietete Tage und y = Gesamtkosten ($), zeichne die Gesamtkosten.',
        hint_slope: 'Wie viel mehr kostet es für jeden zusätzlichen Tag?',
        hint_intercept: 'Selbst für 0 Tage zahlst du noch eine Gebühr. Wie hoch ist sie?',
      },
      4: {
        title: 'Geld ausgeben',
        problem:
          'Du hast 50 $ in deiner Spardose und gibst jeden Tag 5 $ aus. Wenn x = Tage und y = verbleibendes Geld ($), zeichne wie sich deine Ersparnisse verändern.',
        hint_slope: 'Du gibst Geld aus, also sinkt dein Kontostand. Negative Steigung!',
        hint_intercept: 'Wie viel Geld hast du an Tag null?',
      },
      5: {
        title: 'Wachsende Pflanze',
        problem:
          'Eine Pflanze ist 2 cm groß und wächst jede Woche 3 cm. Wenn x = Wochen und y = Höhe (cm), zeichne das Wachstum der Pflanze.',
        hint_slope: 'Wie viele Zentimeter wächst sie pro Woche?',
        hint_intercept: 'Bevor irgendwelche Wochen vergangen sind, wie groß ist die Pflanze?',
      },
    },
  },

  // ─── Pattern mode ─────────────────────────────────────────────────────────
  pattern: {
    title: '🔢 Musterbauer',
    subtitle: 'Klicke auf die im Graphen gezeigten Punkte und enthülle dann die Gerade!',
    pointsToPlot: 'Einzutragende Punkte',
    progress: 'Fortschritt',
    revealBtn: '✨ Gerade enthüllen!',
    equationIs: 'Die Gleichung lautet:',
    nextLevel: 'Nächste Stufe →',
    howToPlay: 'So wird gespielt',
    howToPlayText:
      'Klicke auf dem Koordinatensystem dort, wo du die gestrichelten Kreise siehst, um jeden Punkt einzutragen. Treffe alle 6!',
    slope: 'Steigung',
    intercept: 'Achsenabschnitt',
    levels: {
      1: 'Stufe 1 – Leicht',
      2: 'Stufe 2 – Mittel',
      3: 'Stufe 3 – Schwer',
      4: 'Stufe 4 – Experte',
    },
  },

  // ─── Quiz mode ────────────────────────────────────────────────────────────
  quiz: {
    title: '🕵️ Geradendetektiv',
    subtitle: 'Quiz-Zeit — kannst du den Code knacken?',
    scoreAria: 'Punkte: {correct} von {total}',
    questionOf: 'Frage {n} von {total}',
    formatA: 'Graph → Gleichung',
    formatB: 'Gleichung → Gerade',
    formatAInstruction: 'Was ist die Gleichung dieser Geraden?',
    formatBInstruction: 'Passe die Gerade an diese Gleichung an:',
    submit: '🎯 Antwort einreichen',
    nextQuestion: 'Nächste Frage →',
    seeResults: '🏁 Ergebnisse anzeigen',
    correctLabel: 'Richtig!',
    wrongLabel: 'Nicht ganz!',
    wrongAnswer: 'Antwort: m = {m}, b = {b}',
    endTitle: 'Fall gelöst!',
    endYourScore: 'Dein Ergebnis',
    endBrilliant: 'Fantastische Detektivarbeit! 🌟',
    endGood: 'Gut gemacht! Weiter üben! 💪',
    endKeepGoing: 'Weiter so — du schaffst das! 🔍',
    playAgain: '🔄 Nochmal spielen',
    playAgainAria: 'Nochmal spielen',
    stars: '{stars} von 3 Sternen',
  },
};

export default de;
