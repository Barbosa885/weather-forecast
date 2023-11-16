/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        hot: "#ff3e00",
        warm: "#ff7e00",
        cold: "#00a8ff",
      },
    },
  },
  plugins: [],
};
