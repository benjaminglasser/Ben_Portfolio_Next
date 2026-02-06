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
      screens: {
        '3xl': '1920px',
      },
      fontSize: {
        subheading: "clamp(1rem, 2.5vw, 1.2rem)",
        xxs: "0.8rem",
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' }
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite ease-in-out'
      }
    },
    fontFamily: {
      sprat: ["sprat", "sans-serif"],
      lato: ["Lato", "sans-serif"],
    },
    colors: {
      mute: "#808080",
      greyLight: "#919191",
      greyDark: "#141415",
      pink: "#ff477b",
      black: "#000",
      white: "#fff",
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
