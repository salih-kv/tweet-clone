/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#06141D",
        "secondary-bg": "#1B2730",
        "tertiary-bg": "#28343E",
        "off-white": "#f7f8fa",
        "black-500": "#1dc1c1d",
        "blue-800": "#075085",
        "blue-700": "#035ea1",
        "blue-600": "#0176c8",
        "blue-500": "#1da1f2", // twitter logo blue
        "blue-400": "#38b0f8",
        "blue-300": "#7dcafc",
        "blue-200": "#bae1fd",
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
