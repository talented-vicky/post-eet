/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#f9fafb',
        'primary-light': '#f3f4f6',
        'primary-dark': '#6b7280',
        'primary-black': '#4b5563',

      },
      backgroundImage: {
        'blue-gradient': "linear-gradient(to bottom right, #2654DC 0%, #1135A0 31%, #0F2C80 55%, #112E86 75%, #2654DC 100%)",
        'purple-gradient': "linear-gradient(to bottom right, #653337 0%, #A9676C 38%, #8F5156 69%, #653337 100%)",
        'brown-gradient': "linear-gradient(to bottom right, #121010 0%, #4B493C 55%, #3E3B33 71%, #121010 100%)",
      },
      screens: {
        xs: '360px'
      }
    },
  },
  plugins: [],
}

