/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "home": "url('/assets/bg.png')", // Certifique-se de que o caminho está correto
      },
    },
  },
  plugins: [],
}
