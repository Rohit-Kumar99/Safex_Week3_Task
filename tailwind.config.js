/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          950: '#0c0e12',
          900: '#13161c',
          850: '#1a1e26',
          800: '#222834',
          700: '#31394a',
          600: '#4a5568',
          500: '#718096',
          400: '#a0aec0',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
          50: '#f8fafc',
        },
        safety: {
          DEFAULT: '#ff5500',
          hover: '#e04a00',
          active: '#c23f00',
          light: '#ff7733',
          dim: '#2a150a',
          border: '#ff5500',
        },
        hazard: {
          yellow: '#f59e0b',
          amber: '#d97706',
        }
      },
      fontFamily: {
        heading: ['"Barlow Condensed"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
