/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0f172a',
          secondary: '#1e293b',
        },
        brand: {
          primary: '#3b82f6',
          accent: '#22c55e',
        },
        text: {
          primary: '#e2e8f0',
          secondary: '#94a3b8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

