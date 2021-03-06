module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or "media" or "class"
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      blur: ['group-hover'],
      border: ['hover'],
      borderStyle: ['hover'],
      borderWidth: ['hover', 'focus'],
      borderColor: ['hover', 'focus'],
    },
  },
  plugins: [],
}
