/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        borderColor: "#f2f2f2",
        subText: "#9f9e9f",
        tableh: "#364155",
        primary: {
          DEFAULT: "#405",
          // "#784d92",
          // "#3d52a0",
          // "#1f2833",
          light: "#81C784", // Lighter shade
          dark: "#388E3C", // Darker shade
        },
      },
      fontFamily: {
        poppins: ['"Poppins"', "serif"], // Adding Roboto as an example
        serif: ['"Merriweather"', "serif"],
        monsterrat: ["Monsterrat", "sans-serif"], // Adding Merriweather as an example
        spaceGrot: ["Space Grotesk", "serif"],
      },
    },
    plugins: [],
  },
};
