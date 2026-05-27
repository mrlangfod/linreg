const da = {
  // ─── App shell ────────────────────────────────────────────────────────────
  app: {
    title: 'LineLab',
    subtitle: 'Udforsker for lineære funktioner',
    footer: 'LineLab — Lær lineære funktioner på den sjove måde 📐',
  },

  // ─── Mode nav ─────────────────────────────────────────────────────────────
  nav: {
    explore: 'Udforsk',
    stories: 'Historier',
    patterns: 'Mønstre',
    detective: 'Detektiv',
  },

  // ─── Explore mode ─────────────────────────────────────────────────────────
  explore: {
    title: '🔭 Udforskningstilstand',
    subtitle: 'Træk i skyderne og se linjen bevæge sig i realtid!',
    slope: 'Hældning (m)',
    intercept: 'Y-skæring (b)',
    slopeAria: 'Juster hældning m',
    interceptAria: 'Juster y-skæring b',
    showRiseRun: 'Vis stigning/løb',
    showRiseRunAria: 'Vis stigning/løb-trekant',
    whatMeans: 'Hvad betyder det?',
    valueTable: 'Værditable',
    facts: {
      slopeTitle: 'Hældning (m)',
      slopeText: 'Hvor stejl linjen er. Positiv = går op. Negativ = går ned. Nul = vandret.',
      interceptTitle: 'Y-skæring (b)',
      interceptText: 'Hvor linjen skærer y-aksen — startværdien når x = 0.',
      linearTitle: 'Lineær',
      linearText: 'En ret linje! Samme ændring i y for hvert ens skridt i x.',
    },
  },

  // ─── Plain-Danish line descriptions (used by useLinearFunction) ───────────
  lineDesc: {
    up: 'For hvert skridt til højre går linjen OP {steps}.',
    down: 'For hvert skridt til højre går linjen NED {steps}.',
    flat: 'Dette er en vandret linje. Den går hverken op eller ned — y er altid {value}.',
    step1: '1 skridt',
    stepN: '{n} skridt',
    interceptPositive: 'Linjen skærer y-aksen i +{b}.',
    interceptNegative: 'Linjen skærer y-aksen i {b}.',
    interceptZero: 'Linjen passerer gennem origo (0, 0).',
  },

  // ─── Story mode ───────────────────────────────────────────────────────────
  story: {
    title: '📖 Historieudfordringer',
    subtitle: 'Virkelighedsproblemer — juster linjen til at passe!',
    done: 'klaret',
    adjustLine: 'Juster din linje',
    challengeOf: 'Udfordring {n} af {total}',
    checkAnswer: '🎯 Tjek svar',
    correct: '✓ Korrekt!',
    hintLabel: '💡 Tip',
    successTitle: 'Fantastisk arbejde!',
    successLine: 'Linjen var y = {m}x {b}',
    wrongTitle: 'Ikke helt!',
    prev: '← Forrige',
    next: 'Næste →',
    challenges: {
      1: {
        title: 'Pizzafest',
        problem:
          'En pizza koster $5 plus $2 pr. topping. Hvis x = antal toppings og y = samlet pris i dollars, hvordan ser linjen så ud?',
        hint_slope: 'Tænk over, hvordan prisen ændrer sig for hvert ekstra topping.',
        hint_intercept: 'Hvad koster en pizza med NUL toppings?',
      },
      2: {
        title: 'Brændende lys',
        problem:
          'Et lys er 10 cm højt og brænder 1 cm ned i timen. Hvis x = forløbne timer og y = lysets højde (cm), tegn lysets højde over tid.',
        hint_slope: 'Lyset bliver kortere — skal hældningen være positiv eller negativ?',
        hint_intercept: 'Hvor højt er lyset ved tidspunkt nul?',
      },
      3: {
        title: 'Biludlejning',
        problem:
          'Det koster $20 pr. dag at leje en bil plus et fast registreringsgebyr på $15. Hvis x = antal dage og y = samlet pris ($), tegn den samlede pris.',
        hint_slope: 'Hvor meget mere koster det for hver ekstra dag?',
        hint_intercept: 'Selv for 0 dage betaler du stadig et gebyr. Hvad er det?',
      },
      4: {
        title: 'Brug af penge',
        problem:
          'Du har $50 i din sparegris og bruger $5 om dagen. Hvis x = dage og y = tilbageværende beløb ($), tegn hvordan din opsparing ændrer sig.',
        hint_slope: 'Du bruger penge, så din saldo falder. Negativ hældning!',
        hint_intercept: 'Hvor mange penge har du på dag nul?',
      },
      5: {
        title: 'Voksende plante',
        problem:
          'En plante er 2 cm høj og vokser 3 cm om ugen. Hvis x = uger og y = højde (cm), tegn plantens vækst.',
        hint_slope: 'Hvor mange centimeter vokser den om ugen?',
        hint_intercept: 'Inden nogen uger er gået, hvor høj er planten?',
      },
    },
  },

  // ─── Pattern mode ─────────────────────────────────────────────────────────
  pattern: {
    title: '🔢 Mønsterbygger',
    subtitle: 'Klik på punkterne vist på grafen for at afsætte dem, og afslør derefter linjen!',
    pointsToPlot: 'Punkter at afsætte',
    progress: 'Fremskridt',
    revealBtn: '✨ Afslør linjen!',
    equationIs: 'Ligningen er:',
    nextLevel: 'Prøv næste niveau →',
    howToPlay: 'Sådan spiller du',
    howToPlayText:
      'Klik på koordinatplanet der, hvor du ser de stiplede cirkler, for at afsætte hvert punkt. Match alle 6!',
    slope: 'Hældning',
    intercept: 'Skæring',
    levels: {
      1: 'Niveau 1 – Let',
      2: 'Niveau 2 – Middel',
      3: 'Niveau 3 – Svær',
      4: 'Niveau 4 – Ekspert',
    },
  },

  // ─── Quiz mode ────────────────────────────────────────────────────────────
  quiz: {
    title: '🕵️ Linjedetektiv',
    subtitle: 'Quiz-tid — kan du løse koden?',
    scoreAria: 'Point: {correct} ud af {total}',
    questionOf: 'Spørgsmål {n} af {total}',
    formatA: 'Graf → Ligning',
    formatB: 'Ligning → Linje',
    formatAInstruction: 'Hvad er ligningen for denne linje?',
    formatBInstruction: 'Tilpas linjen til at matche denne ligning:',
    submit: '🎯 Indsend svar',
    nextQuestion: 'Næste spørgsmål →',
    seeResults: '🏁 Se resultater',
    correctLabel: 'Korrekt!',
    wrongLabel: 'Ikke helt!',
    wrongAnswer: 'Svar: m = {m}, b = {b}',
    endTitle: 'Sagen er løst!',
    endYourScore: 'Din score',
    endBrilliant: 'Fremragende detektivarbejde! 🌟',
    endGood: 'Godt gået! Bliv ved med at øve! 💪',
    endKeepGoing: 'Fortsæt — du finder løsningen! 🔍',
    playAgain: '🔄 Spil igen',
    playAgainAria: 'Spil igen',
    stars: '{stars} ud af 3 stjerner',
  },
};

export default da;
