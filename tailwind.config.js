/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#f1d279',
          DEFAULT: '#d4af37',
          dark: '#aa8d2e',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          brown: '#1a0f00',
        },
        cream: '#f5f5dc',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
