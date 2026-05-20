/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   KERAL-B — Données centralisées
   Source unique de vérité pour tous les composants.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export const CONTACT = {
  whatsapp:        '237656783732',
  whatsappDisplay: '+237 656 783 732',
  email:           'keralflora167@gmail.com',
  location:        'Douala, Cameroun',
}

/** Génère un lien WhatsApp avec message pré-rempli. */
export function waLink(productName = '') {
  const message = productName
    ? `Bonjour KERAL-B, je souhaite commander : ${productName}.`
    : `Bonjour KERAL-B, je souhaite passer une commande.`
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`
}

/* ── Produits ── */
export const PRODUCTS = [
  {
    id:        'pur-jus-ananas',
    slug:      'pur-jus-ananas',
    route:     '/jus-pur-ananas',
    name:      "Pur Jus d'Ananas",
    nameShort: 'Ananas',
    tagline:   "L'ananas dans sa vérité la plus pure.",
    price:     2500,
    type:      'JUS',
    volume:    '1 L',
    accentColor: '#F5C842',
    ingredients: [
      { name: 'Ananas', origin: 'Cameroun' },
    ],
    benefits: [
      'Riche en vitamine C',
      'Facilite la digestion',
      'Hydratation naturelle',
    ],
    images: {
      avant:   '/images/produits/ananas-avant.png',
      arriere: '/images/produits/ananas-arriere.png',
    },
    badge: null,
    videoHero:       'https://videos.pexels.com/video-files/5532769/5532769-uhd_2560_1440_25fps.mp4',
    videoLifestyle1: 'https://videos.pexels.com/video-files/7579150/7579150-hd_1080_1920_30fps.mp4',
    videoLifestyle2: 'https://videos.pexels.com/video-files/5704709/5704709-hd_1080_1920_25fps.mp4',
  },
  {
    id:        'ananas-passion',
    slug:      'ananas-passion',
    route:     '/jus-ananas-passion',
    name:      'Ananas-Passion',
    nameShort: 'Passion',
    tagline:   "L'équilibre parfait entre le sucré et le vif.",
    price:     2800,
    type:      'JUS',
    volume:    '1 L',
    accentColor: '#D14E3A',
    ingredients: [
      { name: 'Ananas',              origin: 'Cameroun' },
      { name: 'Fruit de la passion', origin: 'Cameroun' },
    ],
    benefits: [
      'Antioxydants naturels',
      'Énergie durable',
      'Saveur intense et vive',
    ],
    images: {
      avant:   '/images/produits/passion-avant.png',
      arriere: '/images/produits/passion-arriere1.png',
      dessus:  '/images/produits/passion-dessus.png',
    },
    badge: null,
    videoHero:       'https://videos.pexels.com/video-files/6984648/6984648-uhd_2560_1440_25fps.mp4',
    videoLifestyle1: 'https://videos.pexels.com/video-files/3195394/3195394-hd_1080_1920_25fps.mp4',
    videoLifestyle2: 'https://videos.pexels.com/video-files/5704712/5704712-hd_1080_1920_25fps.mp4',
  },
  {
    id:        'ananas-gingembre',
    slug:      'ananas-gingembre',
    route:     '/jus-ananas-gingembre',
    name:      'Ananas-Gingembre',
    nameShort: 'Gingembre',
    tagline:   'Le tonus naturel, sans compromis.',
    price:     2800,
    type:      'JUS',
    volume:    '1 L',
    accentColor: '#E89B3C',
    ingredients: [
      { name: 'Gingembre', origin: 'Cameroun' },
      { name: 'Ananas',    origin: 'Cameroun' },
    ],
    benefits: [
      'Anti-inflammatoire naturel',
      'Stimulant digestif',
      "Renforce l'immunité",
    ],
    images: {
      avant:   '/images/produits/gingembre-avant.png',
      arriere: '/images/produits/gingembre-arriere.png',
    },
    badge: null,
    videoHero:       'https://videos.pexels.com/video-files/4761654/4761654-uhd_2560_1440_25fps.mp4',
    videoLifestyle1: 'https://videos.pexels.com/video-files/6456219/6456219-hd_1080_1920_25fps.mp4',
    videoLifestyle2: 'https://videos.pexels.com/video-files/5257816/5257816-hd_1080_1920_25fps.mp4',
  },
  {
    id:        'ananas-mangue',
    slug:      'ananas-mangue',
    route:     '/jus-ananas-mangue',
    name:      'Ananas-Mangue',
    nameShort: 'Mangue',
    tagline:   'La générosité du Cameroun dans un verre.',
    price:     2800,
    type:      'JUS',
    volume:    '1 L',
    accentColor: '#E89B3C',
    ingredients: [
      { name: 'Ananas', origin: 'Cameroun' },
      { name: 'Mangue', origin: 'Cameroun' },
    ],
    benefits: [
      'Vitamines A & C',
      'Peau éclatante',
      'Saveur ronde et gourmande',
    ],
    images: {
      avant:   '/images/produits/mangue-avant.png',
      arriere: '/images/produits/mangue-arriere.png',
      cote:    '/images/produits/mangue-cote.png',
    },
    badge: null,
    videoHero:       'https://videos.pexels.com/video-files/5532773/5532773-uhd_2560_1440_25fps.mp4',
    videoLifestyle1: 'https://videos.pexels.com/video-files/6984652/6984652-hd_1080_1920_25fps.mp4',
    videoLifestyle2: 'https://videos.pexels.com/video-files/5704715/5704715-hd_1080_1920_25fps.mp4',
  },
  {
    id:        'the-moringa',
    slug:      'the-moringa',
    route:     '/the-moringa',
    name:      'Thé de Moringa',
    nameShort: 'Moringa',
    tagline:   "L'arbre de vie. Vingt sachets de bienfaits.",
    price:     3000,
    type:      'TISANE',
    volume:    '20 sachets',
    accentColor: '#5C7A3A',
    ingredients: [
      { name: 'Moringa oleifera', origin: 'Bio Cameroun' },
    ],
    benefits: [
      'Protéines végétales complètes',
      'Fer & calcium naturels',
      'Détox douce quotidienne',
    ],
    images: {
      avant:    '/images/produits/moringa-avant.png',
      arriere:  '/images/produits/moringa-arriere1.png',
      dessus:   '/images/produits/moringa-dessus.png',
    },
    badge: 'BIO CAMEROUN',
    videoHero:       'https://videos.pexels.com/video-files/7710223/7710223-uhd_2560_1440_25fps.mp4',
    videoLifestyle1: 'https://videos.pexels.com/video-files/5704720/5704720-hd_1080_1920_25fps.mp4',
    videoLifestyle2: 'https://videos.pexels.com/video-files/6984660/6984660-hd_1080_1920_25fps.mp4',
  },
  {
    id:        'turmerimove',
    slug:      'turmerimove',
    route:     '/tisane-turmerimove',
    name:      'TurmeriMove',
    nameShort: 'TurmeriMove',
    tagline:   'Curcuma, gingembre, poivre de Penja. Le trio puissant.',
    price:     3200,
    type:      'COMPLÉMENT',
    volume:    '30 sticks',
    accentColor: '#D4881C',
    ingredients: [
      { name: 'Curcuma',              origin: 'Cameroun'         },
      { name: 'Gingembre',            origin: 'Cameroun'         },
      { name: 'Poivre noir de Penja', origin: 'Penja, Cameroun'  },
    ],
    benefits: [
      'Anti-inflammatoire puissant',
      'Articulations & mobilité',
      'Absorption optimale (pipérine)',
    ],
    images: {
      avant:   '/images/produits/turmerimove-avant.png',
      arriere: '/images/produits/turmerimove-arriere.png',
      cote:    '/images/produits/turmerimove-cote1.png',
      texte:   '/images/produits/turmerimove-texte.png',
    },
    badge: null,
    videoHero:       'https://videos.pexels.com/video-files/6456222/6456222-uhd_2560_1440_25fps.mp4',
    videoLifestyle1: 'https://videos.pexels.com/video-files/5257820/5257820-hd_1080_1920_25fps.mp4',
    videoLifestyle2: 'https://videos.pexels.com/video-files/7579155/7579155-hd_1080_1920_25fps.mp4',
  },
]

export function getProductBySlug(slug)  { return PRODUCTS.find((p) => p.slug === slug) ?? null }

export function getAdjacentProducts(slug) {
  const idx  = PRODUCTS.findIndex((p) => p.slug === slug)
  const prev = idx > 0                    ? PRODUCTS[idx - 1] : PRODUCTS[PRODUCTS.length - 1]
  const next = idx < PRODUCTS.length - 1 ? PRODUCTS[idx + 1] : PRODUCTS[0]
  return { prev, next }
}

/* ── Valeurs de la marque ── */
export const VALUES = [
  { id: 'colorant',     label: 'Zéro Colorant',      desc: 'Aucun colorant artificiel ou naturel ajouté',  icon: '🚫' },
  { id: 'conservateur', label: 'Zéro Conservateur',   desc: 'Pas de conservateurs, durée naturelle',         icon: '🧪' },
  { id: 'arome',        label: 'Zéro Arôme',          desc: 'Seuls les arômes naturels du fruit',            icon: '🌿' },
  { id: 'sucre',        label: 'Zéro Sucre Ajouté',   desc: 'La douceur vient uniquement du fruit',          icon: '🍬' },
]

/* ── Images ambiance ── */
export const AMBIANCE = {
  heroSplash:        '/images/hero-splash.jpg',
  bottle3D:          '/images/bottle-3d.jpg',
  moringaLevitation: '/images/moringa-levitation.jpg',
}
