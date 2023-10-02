/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        code: ["var(--font-code)"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),

    // plugin(function ({ addBase }) {
    //   addBase({ html: { fontSize: "1.1rem" } });
    // }),
  ],
};
