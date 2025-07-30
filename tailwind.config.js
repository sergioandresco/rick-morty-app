/** @type {import('tailwindcss').Config} */

export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['GT Planar', 'sans-serif'],
          heading: ['Acorn', 'sans-serif'],
          schwifty: ['GetSchwifty', 'cursive'],
        },
        colors: {
          primary: {
            100: "#EDE4FF",
            600: "#7E5BEF",
            700: "#5B3CBF",
          },
          secondary: {
            600: "#5BEF5B",
          },
        },
      },
    },
    plugins: [],
}