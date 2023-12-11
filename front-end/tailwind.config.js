/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        cream: "#EEE6DB",
        "light-blue": "#65C8E0",
        "light-cream": "#FBF7F2",
        "dark-cream": "#F8E7D3",
        "dark-blue": "rgba(58, 154, 177, 0.90)",
        "brown-text": "#6D6D6D",
      },
      spacing: {
        999: "999px",
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        pop: "pop 0.5s ease-in-out",
      },
      fontFamily: {},
    },
  },
  plugins: [],
};
