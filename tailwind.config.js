/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1240px' },
    },
    extend: {
      colors: {
        // ── "Royal Maheshwari" — deep wine + antique gold on warm ivory ────
        // Token NAMES are kept stable so components need no churn; only the
        // values change. `brand` = wine chrome, `gold` = accent, `ivory` = ground.
        brand: {
          DEFAULT: '#9B2D3B', // crimson-wine — links, active states
          deep: '#6B1E2B', // deep wine — buttons, header, nav, bars
          mid: '#551621', // hover / pressed
          soft: '#EFD3D6', // deeper blush — hover tints
        },
        // Wine scale (kept under the `forest` key to preserve `forest-700` usages).
        forest: {
          50: '#FBEDEF',
          100: '#F6D6DB',
          200: '#E9AAB4',
          300: '#DB7D8C',
          400: '#C25366',
          500: '#9B2D3B',
          600: '#7C2433',
          700: '#6B1E2B',
          800: '#4C1520',
          900: '#340E18',
        },
        ivory: '#FBF6EE', // warm cream — page ground
        cream: '#FEFBF6', // lighter cream — raised surfaces
        sage: '#F7E7E8', // soft blush — chips, tints (name kept for compat)
        gold: {
          DEFAULT: '#B4832B', // antique gold — premium accents only
          light: '#CDA14B',
          soft: '#F3E7CB',
        },
        charcoal: '#2C1A1E', // espresso plum-black — body text
        muted: '#806A6D', // secondary text
        line: '#ECDFD2', // warm hairline borders
        // Semantic (distinct from the wine brand + gold accent).
        success: { DEFAULT: '#2E7D57', soft: '#E4F0E9' },
        warning: { DEFAULT: '#9A6B12', soft: '#F6ECD2' },
        error: { DEFAULT: '#C0392B', soft: '#F7E4E1' },
        whatsapp: { DEFAULT: '#25D366', dark: '#1FB457' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-sm': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-md': ['3rem', { lineHeight: '1.04', letterSpacing: '-0.015em' }],
        'display-lg': ['4rem', { lineHeight: '0.98', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        xl2: '1.25rem',
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(75,21,32,0.05)',
        card: '0 1px 2px rgba(75,21,32,0.05), 0 8px 24px rgba(75,21,32,0.07)',
        'card-hover': '0 2px 6px rgba(75,21,32,0.09), 0 18px 44px rgba(75,21,32,0.14)',
        gold: '0 8px 24px rgba(180,131,43,0.20)',
      },
      letterSpacing: {
        label: '0.14em',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        rise: 'rise 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fade-in 0.5s ease both',
        'spin-slow': 'spin-slow 9s linear infinite',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22,1,0.36,1)',
      },
    },
  },
  plugins: [],
};
