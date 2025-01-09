/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      red: "#830109",
      secondary: "#555",
    },
  },
  plugins: [daisyui],
};
