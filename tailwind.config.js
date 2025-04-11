/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: "#830109",
        secondary: "#555",
        primary: "#555",
        primaryBG: "#f8f8f8",
      },
    },
  },
  plugins: [daisyui],
};
