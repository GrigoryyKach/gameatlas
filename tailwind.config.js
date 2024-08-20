/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    fontFamily: {
      primary: "var(--font-worksans)",
    },
    extend: {
      colors: {
        primary: "#181A2A",
        accent: {
          DEFAULT: "#4B6BFB",
          hover: "#4B62BC",
        },
        secondary: "#A1A1AA",
        minibg: "#242535",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/line-clamp'),
  ],
}