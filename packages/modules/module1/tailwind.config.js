/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "../../shared/src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [
    require("../../shared/tailwind.config.js")
  ]
};
