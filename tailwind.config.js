/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,js,jsx,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#ffedd5",
        secondary: "#ff9239",
      },
    },
  },
  plugins: [],
};
