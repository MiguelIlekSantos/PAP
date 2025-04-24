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
          '0%': {transform: 'translateX(0vw)'},
          '100%': {transform: 'translateX(-100vw)'}
        },
        'fall-45': {
          '0%': {transform: 'translateX(-50vw) translateY(-20vw) rotate(45deg)', opacity:0},
          '50%': { opacity: 1},
          '100%': {transform: 'translateX(120vw) translateY(120vw) rotate(45deg)', opacity:0}
        }
      },
      animation: {
        'back-slide': 'back-slide 8s linear infinite alternate',
        'fall-45': 'fall-45 20s linear infinite'
      },
      colors: {
        mainColor1: 'var(--mainColor1)',
        mainColor2: 'var(--mainColor2)',
        bgBallColor: 'var(--bgBallColor) '
      }
    },
  },
  plugins: [daisyui],
};
