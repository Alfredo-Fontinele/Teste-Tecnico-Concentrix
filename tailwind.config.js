/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        pallete: {
          light: {
            1: "#e8e6e3",
          },
          dark: {
            1: "#181a1b",
            2: "#373c3e",
          },
          gray: {
            50: "#F1F5F9",
            100: "#E1E1E6",
            150: "#E8E7E9",
          },
        },
      },
    },
  },
  plugins: [],
}
