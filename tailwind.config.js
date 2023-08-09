/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#d5f7f1',
        secondary: {
          100: '#0af2c0',
          200: '#b07ff5'
        },
        warn:'#f20a0a'
      },
      fontFamily:{
        Lubri:['Lubri']
      }
    },
  },
  plugins: [require('tailwindcss-animated')],
}

