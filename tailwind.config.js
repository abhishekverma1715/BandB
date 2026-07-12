/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#0F172A",
        accent: "#14B8A6",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        background: "#F8FAFC",
        dark: "#020617"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
