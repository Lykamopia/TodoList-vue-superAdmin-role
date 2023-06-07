/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primaryNavColor:'#23328C',
        countColor: '#cccccc',
        body: '#FAFAFA',
      },
      fontFamily: {
        sans: ['Lato'],
      },
    },
  },
  plugins: [],
}

