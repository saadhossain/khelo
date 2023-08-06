/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': "#090B28",
        'secondary': "#13183F",
        'accent': "#24B299",
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "night"],
  },
};
