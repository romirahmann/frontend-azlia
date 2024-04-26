/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    fontFamily: {
      primary: "Poppins",
    },
    colors: {
      primary: "#020164",
      secondary: "#fde020 ",
      third: "#1b6714",
    },
  },
  plugins: [require("flowbite/plugin")],
};
