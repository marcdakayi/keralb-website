/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   KERAL-B — Tokens d'animation
   Utilisés par Framer Motion et GSAP.
   Miroir JS des variables CSS du design system.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* ── Couleurs ── */
export const COLORS = {
  noir:  { scene: '#0A0908', elevated: '#1F1B17' },
  creme: { papier: '#F4EDE0', base: '#E8DFCC' },
  or:    { penja: '#C9A961', deep: '#8B7332' },
  terre: '#3B2E1F',
  accent: {
    ananas:    '#F5C842',
    passion:   '#D14E3A',
    mangue:    '#E89B3C',
    moringa:   '#5C7A3A',
    curcuma:   '#D4881C',
  },
}

/* ── Easing — format tableau pour Framer Motion ── */
export const EASE = {
  theater: [0.76, 0, 0.24, 1],        /* entrées dramatiques */
  smooth:  [0.25, 0.1, 0.25, 1],      /* transitions UI      */
  spring:  [0.34, 1.56, 0.64, 1],     /* rebond léger        */
  breathe: [0.45, 0.05, 0.55, 0.95],  /* oscillation lente   */
  out:     [0.0, 0.0, 0.2, 1.0],      /* ease-out standard   */
}

/* ── Durées (secondes pour Framer Motion) ── */
export const DUR = {
  micro:   0.15,
  fast:    0.25,
  normal:  0.35,
  rideau:  0.65,
  rideauOut: 0.5,
  breathe: 8,
  wordEnter: 0.55,
}

/* ── Variants Framer Motion — Rideau de page ── */
export const rideauVariants = {
  /* Le rideau or entre depuis le bas et couvre l'écran */
  coverIn: {
    initial: { scaleY: 0, originY: 1 },
    animate: {
      scaleY: 1,
      originY: 1,
      transition: { duration: DUR.rideau, ease: EASE.theater },
    },
  },
  /* Le rideau se retire vers le haut, révèle la nouvelle page */
  coverOut: {
    animate: { scaleY: 0, originY: 0 },
    transition: { duration: DUR.rideauOut, ease: EASE.theater },
  },
}

/* ── Variants page entière ── */
export const pageVariants = {
  initial: {
    clipPath: 'inset(100% 0 0 0)',
    opacity:  1,
  },
  animate: {
    clipPath: 'inset(0% 0 0 0)',
    opacity:  1,
    transition: {
      clipPath: { duration: DUR.rideau, ease: EASE.theater },
    },
  },
  exit: {
    clipPath: 'inset(0 0 100% 0)',
    opacity:  1,
    transition: {
      clipPath: { duration: DUR.rideauOut, ease: EASE.theater },
    },
  },
}

/* ── Variants typographie — mot par mot ── */
export const wordVariants = {
  hidden:  { opacity: 0, y: '0.3em', filter: 'blur(3px)', skewY: 1 },
  visible: (i = 0) => ({
    opacity:    1,
    y:          '0em',
    filter:     'blur(0px)',
    skewY:      0,
    transition: {
      duration: DUR.wordEnter,
      delay:    i * 0.12,
      ease:     EASE.out,
    },
  }),
}

/* ── Variants carte produit ── */
export const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity:    1,
    y:          0,
    transition: {
      duration: DUR.normal,
      delay:    i * 0.07,
      ease:     EASE.smooth,
    },
  }),
  hover: {
    transition: { duration: DUR.fast, ease: EASE.smooth },
  },
}

/* ── Variants trait or ── */
export const traitVariants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: DUR.normal, ease: EASE.out, delay: 0.2 },
  },
}

/* ── Variants navbar ── */
export const navVariants = {
  top:      { backgroundColor: 'rgba(10, 9, 8, 0)',   backdropFilter: 'blur(0px)' },
  scrolled: { backgroundColor: 'rgba(10, 9, 8, 0.92)', backdropFilter: 'blur(12px)' },
  transition: { duration: DUR.fast, ease: EASE.smooth },
}

/* ── Variants menu burger mobile ── */
export const menuVariants = {
  closed: {
    clipPath: 'inset(0 0 100% 0)',
    opacity:  0,
    transition: { duration: DUR.fast, ease: EASE.theater },
  },
  open: {
    clipPath: 'inset(0 0 0% 0)',
    opacity:  1,
    transition: { duration: DUR.normal, ease: EASE.theater },
  },
}

export const menuItemVariants = {
  closed: { opacity: 0, x: -12 },
  open:   (i = 0) => ({
    opacity:    1,
    x:          0,
    transition: {
      duration: DUR.fast,
      delay:    0.1 + i * 0.06,
      ease:     EASE.smooth,
    },
  }),
}

/* ── Stagger container (grille produits) ── */
export const staggerContainer = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren:  0.08,
      delayChildren:    0.1,
    },
  },
}

/* ── Breakpoints (mirrors Tailwind) ── */
export const BP = {
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1280,
  xxl: 1440,
}
