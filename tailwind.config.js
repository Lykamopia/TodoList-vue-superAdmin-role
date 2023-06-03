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
        countColor: '#9E9E9E',
        body: '#FAFAFA',
      }
    },
  },
  plugins: [],
}

