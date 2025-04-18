/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx,tsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
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
      primary: "var(--font-play)",
    },
    extend: {
      dropShadow: {
        '3xl': '0 2px 10px rgba(24, 26, 42, 1)',
      },
      colors: {
        primary: "#181A2A",
        accent: {
          DEFAULT: "#4B6BFB",
          hover: "#4B62BC",
        },
        secondary: "#A1A1AA",
        minibg: "#242535",
        footer: "#141624",
        text: "#BABABF"
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/line-clamp'),
  ],
}