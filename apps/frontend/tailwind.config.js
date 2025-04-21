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
        }
      },
      animation: {
        'back-slide': 'back-slide 5s linear infinite alternate'
      },
      colors: {
        mainColor1: 'var(--mainColor1)',
        mainColor2: 'var(--mainColor2)'
      }
    },
  },
  plugins: [daisyui],
};
