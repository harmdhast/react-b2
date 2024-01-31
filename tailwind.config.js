/** @type {import('tailwindcss').Config} */
import colors, { indigo, yellow, gray } from 'tailwindcss/colors'
export const darkMode = ["class"]
export const content = [
  './src/**/*.{js,jsx}',
]
export const prefix = ""
export const theme = {
  colors: {
    ...colors,
    primary: indigo,
    secondary: yellow,
    neutral: gray,
  },
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  fontFamily: {
    sans: ['"Inter"', 'sans-serif']
  },
  extend: {
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
}
export const plugins = [require("tailwindcss-animate"), require('@tailwindcss/typography')]