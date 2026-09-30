/** Static site configuration. Business-editable content moves to the API
 * (WebsiteSetting) in a later phase; env provides the WhatsApp number now. */

export const site = {
  name: import.meta.env.VITE_BRAND_NAME ?? 'TAAJ Handloom',
  tagline: 'Authentic Maheshwari Handloom from Maheshwar',
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER ?? '',
  location: 'Maheshwar, Madhya Pradesh, India',
  announcement: 'Authentic Maheshwari Handloom • Manufacturer • Wholesale • Retail',
};

/**
 * Instagram feed for the home page. The live grid is powered by a free
 * Behold.so feed (official Instagram API — no scraping, auto-updates):
 *   1. Sign up at https://behold.so and connect the @taaj_handloom account.
 *   2. Create a feed, then copy its Feed ID.
 *   3. Set VITE_BEHOLD_FEED_ID in frontend/.env (or paste it below).
 * Until a feed ID is set, the section shows a "Follow us" call-to-action.
 */
export const instagram = {
  handle: 'taaj_handloom',
  profileUrl: 'https://www.instagram.com/taaj_handloom/',
  beholdFeedId: import.meta.env.VITE_BEHOLD_FEED_ID ?? '',
};

/** Primary navigation — maps to catalog category slugs + info pages. */
export const primaryNav = [
  { label: 'Home', to: '/' },
  { label: 'Sarees', to: '/sarees' },
  { label: 'Suits', to: '/suits' },
  { label: 'Chunari', to: '/chunari' },
  { label: 'Wholesale', to: '/wholesale' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

/** Category slug → display metadata used by the catalog pages. */
export const CATEGORY_PAGES: Record<string, { title: string; blurb: string }> = {
  sarees: {
    title: 'Maheshwari Sarees',
    blurb: 'Handwoven sarees with signature Maheshwari borders and reversible pallus.',
  },
  suits: {
    title: 'Suits',
    blurb: 'Elegant handloom suit sets crafted in breathable cotton-silk.',
  },
  chunari: {
    title: 'Chunari',
    blurb: 'Traditional chunari with delicate weaves and timeless motifs.',
  },
};
