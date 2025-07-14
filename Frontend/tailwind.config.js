

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
   
// extend: {
//   animation: {
//     textGlow: 'pulse 2s ease-in-out infinite',
//   },
//   keyframes: {
//     pulse: {
//       '0%, 100%': { opacity: 1 },
//       '50%': { opacity: 0.6 },
//     },
//   },
// },

//   },
//   plugins: [],
// };



/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.6 },
        },
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out forwards",
        "slide-in-left": "slideInLeft 1s ease-out forwards",
        "slide-in-right": "slideInRight 1s ease-out forwards",
        "text-glow": "pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
