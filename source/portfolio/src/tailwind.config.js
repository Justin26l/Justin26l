module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#faffe5",
          100 : "#f1ffc6",
          200 : "#e3ff93",
          300 : "#ccff55",
          400 : "#b5f922",
          500 : "#a2f203",
          600 : "#73b300",
          700 : "#578803",
          800 : "#466a0a",
          900 : "#3c5a0d",
          950 : "#1d3201",
        },
        secondary: {
          50: '#fff8ed',
          100: '#fff0d4',
          200: '#ffdea8',
          300: '#ffc570',
          400: '#ffa137',
          500: '#ff820a',
          600: '#f06906',
          700: '#c74e07',
          800: '#9e3e0e',
          900: '#7f350f',
          950: '#451805',
        }
      },
      fontFamily: {
      },
    },
  },
  plugins: [],
}