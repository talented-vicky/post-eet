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

        'main-one': '#59A404',
        'main-complement': '#2654DC',

        'teal-main': '#005757',
        'teal-light': '#33cccc',
        'teal-dark': '#008080',
        // 'green-primary': '#49A010',
        // 'green-primary-2': '#489F0F',
        // 'green-secondary': '#397E0C',
        // 'green-secondary-2': '#3A7F0D',

        'gray-main': '#7c7c7c',
        'gray-light': '#f5f5f4',

        'red-stroke': '#FF0000',
        'red-backGround': '#FFCCCC',
        'tertiary-stroke': '#CC9900',
      },
      backgroundImage: {
        // 'teal-gradient': "linear-gradient(to bottom right, #33cccc 0%, #008080 33%, #008080 67%, #33cccc 100%)",
        'teal-gradient': "linear-gradient(to bottom right, #005757 0%, #008080 33%, #008080 67%, #005757 100%)",
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

