/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mainFont: ['Roboto', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '28% 70%',
      },
      colors: {
        skyBlue: '#4A90E2',
        teal: '#28844b',
        teal2: '#a8cf45',
        warmYellow: '#F5A623',
        lightGray: '#F6F6F6',
        darkCharcol: '#333333',
        lightGray2: '#E0E0E0',
      },
    },
  },
  plugins: [],
};
