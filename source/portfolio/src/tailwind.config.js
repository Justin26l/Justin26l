module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900 : "#2E4500",
          800 : "#496D00",
          700 : "#649600",
          600 : "#7FBE00",
          500 : "#9ae600",
          400 : "#ACEA2D",
          300 : "#BDEF59",
          200 : "#CFF386",
          100 : "#E1F8B3",
        },
        secondary: {
          900: "#800213",
          800: "#9F0703",
          700: "#BF2803",
          600: "#DF5304",
          500: "#ff8904",
          400: "#FF9E30",
          300: "#FFB25C",
          200: "#FFC788",
          100: "#FFDCB4",
        }
      },
      fontFamily: {
      },
    },
  },
  plugins: [],
}