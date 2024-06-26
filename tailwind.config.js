/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "light-orange": "#e6c887",
      "extra-light-orange": "#fcf9f0",

      "dark-blue": "#143642",

      "light-gray": "#f6f7f9",

      white: "hsl(0, 0%, 100%)",

      black: "hsl(0, 0%, 0%)",

      transparent: "rgba(0, 0, 0, 0)",

      yellow: "#ffc43d",

      green: "#11B136",

      gray: "#959595",

      red: "#fb3640",

      cgreen: "#b4c424",
      corange: "#f78c3b",
      cblue: "#00bbda",
      cpink: "#ed5672",
    },
  },
  plugins: [],
};
