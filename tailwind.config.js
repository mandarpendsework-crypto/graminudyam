/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        emerald: {
          600: "#059669",
          700: "#047857",
        },
        indigo: {
          600: "#4f46e5",
          700: "#4338ca",
        },
        slate: {
          900: "#0f172a",
        },
      },
    },
  },
  plugins: [],
};
