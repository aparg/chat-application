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
        "dark-img-gradient": "rgba(26, 8, 8, 0.20)",
        "light-img-gradient": "rgba(213, 201, 182, 0.80)",
        "dark-brown": "#A27E53",
        gray: "rgba(0, 0, 0, 0.05)",
        "dark-gray": "#959595",
        "semi-dark-gray": "#D9D9D9",
      },
      spacing: {
        999: "999px",
      },
      height: {
        "1/10": "10%",
        "1/20": "5%",
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        pop: "pop 0.5s ease-in-out",
        drop: "drop 0.5s ease-in-out",
      },
      borderRadius: {
        "4xl": "5rem",
      },
      maxWidth: {
        60: "60%",
      },
      keyframes: {
        drop: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0%)" },
        },
      },
    },
  },
  plugins: [],
};
