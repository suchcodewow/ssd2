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
        sans: ["var(--font-open-sans)"],
        serif: ["var(--font-spectral)"],
      },
    },
  },
  plugins: [
    // plugin(function ({ addBase }) {
    //   addBase({ html: { fontSize: "1.1rem" } });
    // }),
  ],
};
