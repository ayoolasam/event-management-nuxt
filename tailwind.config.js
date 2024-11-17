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
        primary: {
          DEFAULT: "#024950",
          light: "#81C784", // Lighter shade
          dark: "#388E3C", // Darker shade
        },
      },
      fontFamily: {
        poppins: ['"Poppins"', "serif"], // Adding Roboto as an example
        serif: ['"Merriweather"', "serif"],
        monsterrat: ["Monsterrat", 'sans-serif'], // Adding Merriweather as an example
      },
    },
    plugins: [],
  },
};
