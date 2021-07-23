module.exports = {
  purge: ['./public/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
        fuggles: ['Fuggles'],
      },
      colors: {
        primary: '#fff0e5',
        secondary: '#f5fcff',
      },
      spacing: {
        primary: '600px',
        secondary: '550px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
