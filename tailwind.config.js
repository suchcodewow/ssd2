/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  // TODO ./content folder not needed?
  // content: ["./content/**/*.{md,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  content: ["./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
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
    // plugin(function ({ addBase }) {
    //   addBase({ html: { fontSize: "1.1rem" } });
    // }),
  ],
};
