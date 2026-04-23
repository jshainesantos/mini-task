/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: "#ed5145",
        "deep-black": "#1f1f1f",
        "mid-gray": "#353535",
        magenta: "#b92d71",
        danger: "#fa1b1b",
        "brand-dark": "#B92D61",
      },
    },
  },
  plugins: [],
};
