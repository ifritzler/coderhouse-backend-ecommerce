/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './views/**/*.{html,js,handlebars}',
    './public/**/*.{html,js,handlebars}',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
