/** @type {import('tailwindcss').Config} */
module.exports = {
  peer: [],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBlue: "#BFDBFE",
        middleBlue: "#6491fc",
        greatBlue: "#0E6EFC",
        greatGreen: "#B1FF03",
        darkGreen: "#007400",
        greatRed: "#ff5365",
      },
      animation: {
        blob: "blob 6s infinite",
        "boucing-1": "jump-up 0.6s 0.1s linear infinite",
        "boucing-2": "jump-up 0.6s 0.2s linear infinite",
        "boucing-3": "jump-up 0.6s 0.3s linear infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate (0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.2) ",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.8)",
          },
          "100%": {
            transform: "tranlate(0px, Opx) scale(1)",
          },
        },
        "jump-up": {
          "50%": { transform: "translate(0, 15px)" },
        },
      },
    },
  },

  plugins: [],
};
