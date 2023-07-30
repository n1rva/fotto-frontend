/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBlue: "#E9FCFF",
        secBlue: "#6EDEFF",
        iconBlue: "#1FDCF3",
        darkerMain: "#DCFAFF",
        fottoWhite: "#F7FAFF",
        fottoText: "#545454",
        fottoOrange: "#EB8A18",
        darkerOrange: "#FF692E",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
