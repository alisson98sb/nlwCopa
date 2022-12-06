/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif'
      },

      backgroundImage: {
        appBackgroundImage: 'url(/app-bg.png)'
      },

      colors: {

        igniteYellow :{
          500: '#F7DD43',
          700: '#CFB82E'
        },
        igniteGreen: {
          500: '#129E57'
        },
        gray: {
          100: '#E1E1E6',
          300: '#8D8D99',
          900: '#121214'
        },
      }
    },
  },
  plugins: [],
}
