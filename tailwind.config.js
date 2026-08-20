/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#FFE4EC',
        petal: '#FFC2D6',
        rose: '#FF8FAB',
        berry: '#FF5C8A',
        cream: '#FFF6F8',
        plum: '#B23A5C',
      },
      fontFamily: {
        display: ['"Baloo 2"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px rgba(255, 143, 171, 0.55)',
        soft: '0 8px 30px rgba(178, 58, 92, 0.15)',
      },
    },
  },
  plugins: [],
}
