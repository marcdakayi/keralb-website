/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold:           '#C8A96E',
        'gold-light':   '#E8C547',
        'gold-dark':    '#A0823E',
        'keral-green':  '#1D6B3E',
        'apple-gray':   '#F5F5F7',
        'apple-dark':   '#1C1C1E',
      },
      fontFamily: {
        sans:  ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        apple:    '14px',
        'apple-lg': '20px',
        'apple-xl': '28px',
        pill:     '980px',
      },
      backdropBlur: {
        apple: '20px',
      },
    },
  },
  plugins: [],
}
