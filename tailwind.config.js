/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        'primary': {
          100: '#464AA3',
          200: '#464E9F',
        },
        'secondary': {
          100: '#F2F2F2',
        },
        'glass': {
          100: 'rgba(255, 255, 255, 0.1)',
          200: 'rgba(255, 255, 255, 0.2)',
          300: 'rgba(255, 255, 255, 0.3)',
          dark: 'rgba(0, 0, 0, 0.3)',
        },
        'surface': {
          light: '#ffffff',
          dark: '#121212',
        }
      },
    },
  },
  plugins: [],
}

