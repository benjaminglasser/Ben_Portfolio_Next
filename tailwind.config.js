/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        subheading: "clamp(1rem, 2.5vw, 1.2rem)",
        xxs: "0.8rem",
      },
    },
    fontFamily: {
      sprat: ["sprat", "sans-serif"],
      lato: ["Lato", "sans-serif"],
    },
    colors: {
      mute: "#afafaf",
      pink: "#ff477b",
      black: "#000",
      white: "#fff",
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
