const colors = require("./colors");

module.exports = {
  mode: "jit",
  purge: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      outline: {
        blue: ["1px auto " + colors.link, "3px"],
      },
      height: (_theme) => ({
        "screen-with-toolbar": "calc(100vh - 64px)",
        "screen-80": "80vh",
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
      }),
      colors,
    },
  },
  variants: {
    extend: {
      backgroundColor: ["focus", "hover", "active"],
      borderStyle: ["focus"],
      borderWidth: ["focus", "active"],
      borderColor: ["active"],
      margin: ["last"],
      ringOffsetWidth: ["active"],
      ringWidth: ["focus", "active"],
      textColor: ["group-focus", "active"],
      textOpacity: ["group-focus"],
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
],
};
