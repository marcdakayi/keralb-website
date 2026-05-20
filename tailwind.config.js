/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#E8C547',
        keral: {
          orange: '#E86B2A',
          green: '#3A7A3A',
          dark: '#050505',
          dark2: '#0C0C0C',
          cream: '#F0EBE0',
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['"Cormorant Garamond"', 'serif'],
      },
      fontSize: {
        'hero': 'clamp(5rem, 18vw, 16rem)',
        'display': 'clamp(3rem, 8vw, 8rem)',
        'title': 'clamp(2rem, 5vw, 4rem)',
      },
    },
  },
  plugins: [],
}
