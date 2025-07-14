/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "neon": "0 0 10px rgba(0, 201, 255, 0.7), 0 0 20px rgba(0, 201, 255, 0.5)",
      },
    },
  },
  plugins: [],
}

