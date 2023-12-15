/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // ! Override all screens
    // screens: {
    //   md: "800px",
    //   // => @media (min-width: 800px)
    // },

    // ! Override Only One screen
    extend: {
      screens: {
        md: "800px",
        // => @media (min-width: 800px)
      },
      // that is animation class
      animation: {
        fade: "fadeOut 0.2s ease-in-out",
      },

      // that is actual animation
      keyframes: () => ({
        fadeOut: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      }),
    },
  },
  plugins: [],
  darkMode: "class",
};
