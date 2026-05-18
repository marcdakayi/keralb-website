/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        keral: {
          yellow: '#FFD700',
          orange: '#FF6B00',
          green: '#2D7A2D',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
      }
    },
  },
  plugins: [],
}
