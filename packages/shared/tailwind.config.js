/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'neumorphic': '3px 3px 6px #b8b9be, -3px -3px 6px #ffffff',
        'neumorphic-inset': 'inset 3px 3px 6px #b8b9be, inset -3px -3px 6px #ffffff',
      },
      backgroundColor: {
        'base': '#e0e5ec',
      },
    },
  },
  plugins: [],
};
