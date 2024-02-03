/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // extend: {
    //   backgroundImage: {
    //     "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
    //     "gradient-conic":
    //       "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    //   },
    // },
    fontFamily: {
      sprat: ["sprat"],
      lato: ["Lato", "sans-serif"],
      imogen: ["imogen"],
      hellplague: ["hellplague"],
    },
    colors: {
      mute: "#808080",
      pink: "#ff477b",
      black: "#000",
      white: "#fff",
    },
  },
  plugins: [],
};
