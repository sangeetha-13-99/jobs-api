/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}","./index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      // // backgroundImage: {
      // //   'input-bg-image': "url('/src/assets/backgroundImg.png')"
      // // },
      // darkMode: ['class', '[data-mode="dark"]'],
    },
  },
  plugins: [],
}
