/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          gold: "#D4AF37",
          darkGold: "#B8860B",
        },
        secondary: {
          bg: "#FAF7F0",
          mutedText: "#6B7280",
          darkText: "#1F2937",
        },
        success: "#16A34A",
        danger: "#DC2626",
        border: "#E5E7EB",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
