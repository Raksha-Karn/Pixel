/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./main.js", "node_modules/preline/dist/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("preline/plugin")],
};
