const { default: daisyui } = require('daisyui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './{src,pages,components,app}/**/*.{ts,tsx,js,jsx,html}',
    '!./{src,pages,components,app}/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
    //     ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    extend: {
      keyframes: {
        'back-slide': {
          '0%': { transform: 'translateX(0vw)' },
          '100%': { transform: 'translateX(-100vw)' }
        },
        'fall-45': {
          '0%': { transform: 'translateX(-50vw) translateY(-20vw) rotate(45deg)', opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { transform: 'translateX(120vw) translateY(120vw) rotate(45deg)', opacity: 0 }
        },
        'card-border': {
          '0%': { "border-color": '#93c5fd' },
          '100%': { "border-color": '#a855f7' },
        },
        'card-sign': {
          '0%': { "background-color": '#93c5fd' },
          '100%': { "background-color": '#a855f7' },
        },
        'showing-up': {
          '0%': { transform: 'translateY(10vw)', opacity: "0%" },
          '100%': { transform: 'translateY(0vw)', opacity: "100%" }
        },
        'fade-out': {
          '0%': { transform: 'translateY(0vw)', opacity: "100%" },
          '100%': { transform: 'translateY(10vw)', opacity: "0%" }
        },
      },
      animation: {
        'back-slide': 'back-slide 8s linear infinite alternate',
        'fall-45': 'fall-45 20s linear infinite',
        'card-border': 'card-border 1s linear infinite alternate',
        'card-sign': 'card-sign 1s linear infinite alternate',
        'showing-up': 'showing-up 0.5s linear',
        'fade-out': 'fade-out 0.5s linear',
      },
    },
  },
  plugins: [daisyui],
};
