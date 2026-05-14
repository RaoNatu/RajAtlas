/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        desert: {
          50: "#fff8ec",
          100: "#f7ead0",
          200: "#efd5a6",
          300: "#e4b86f",
          400: "#d9953f",
          500: "#bf7327",
          600: "#98511e",
          700: "#743b1c",
          800: "#512b1a",
          900: "#2f1a12",
        },
        royal: {
          50: "#eef6ff",
          100: "#d7e9ff",
          200: "#b9dcff",
          300: "#89c4ff",
          400: "#52a2ff",
          500: "#2b7ee8",
          600: "#1c5fc4",
          700: "#184a94",
          800: "#183f78",
          900: "#172d4f",
        },
        maroon: {
          50: "#fff1f2",
          100: "#ffe1e4",
          200: "#ffc8cf",
          300: "#ffa0ac",
          400: "#ff687c",
          500: "#f43f5e",
          600: "#d11d43",
          700: "#9f1736",
          800: "#841832",
          900: "#4a0c1b",
        },
      },
      boxShadow: {
        soft: "0 18px 50px rgba(47, 26, 18, 0.12)",
        insetSoft: "inset 0 1px 0 rgba(255,255,255,0.55)",
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
