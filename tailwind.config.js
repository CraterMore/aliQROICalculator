/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": {
          light: "#cdb4ed",
          DEFAULT: "#71509C",
          dark: "#220e3b",
          bright: "#762cd1",
        },
        "celltreat": "#00933B",
        "magenta": "#DC217C",
      }
    },
  },
  plugins: [],
}

