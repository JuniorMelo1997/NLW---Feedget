module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        brand:{
          300: "#996dff",
          500: "#8257E5"
        }
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require('tailwind-scrollbar')
  ],
}
