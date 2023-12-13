/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "./*.html"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: "'Montserrat', sans-serif;"
      },
      colors: {
        "blue-moodle": "#194866",
        "orange-moodle": "#f98012",
        "info-text": "#838383",
        "background": "#f5f5f5"
      },
      keyframes: {
        "fade-in": {
          "0%": {transform: "translateX(-5rem)", opacity: 0},
          "100%": {transform: "translateX(0)", opacity: 1}
        }
      },
      animation: {
        "fade-in": "fade-in forwards ease-out 0.75s"
      }
    },
  },
  plugins: [],
}