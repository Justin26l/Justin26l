module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#bbf451', 
          500: '#9ae600', 
          600: '#5ea500', 
        },
        secondary: {
          400: '#ffb86a',
          500: '#ff8904', 
          600: '#f54a00',
        }
      },
      fontFamily: {
      },
    },
  },
  plugins: [],
}