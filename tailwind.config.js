module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: `"IBM Plex Sans", San Francisco, Segoe UI, sans-serif`,
    },
    screens: {
      sm: '576px',
      // => @media (min-width: 576px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '992px',
      // => @media (min-width: 992px) { ... }

      xl: '1440px',
      // => @media (min-width: 1440px) { ... }
    },
    colors: {
      // Primary colors
      'blue-600': '#0044b3',
      'blue-400': '#0061ff',
      'blue-300': '#99c0ff',
      'blue-200': '#ccdfff',
      'blue-100': '#f2f7ff',

      'dark-400': '#00003c',
      'dark-300': '#9999b1',
      'dark-200': '#ccccd8',
      'dark-100': '#f2f2f5',

      'red-600': '#b30038',
      'red-400': '#ff0050',
      'red-300': '#ff99b9',
      'red-200': '#ffccdc',
      'red-100': '#fff2f6',

      white: '#ffffff',

      // Support colors
      'blueberry-600': '#24268e',
      'blueberry-400': '#4649d0',
      'blueberry-300': '#b5b6ec',
      'blueberry-200': '#dadbf6',
      'blueberry-100': '#f6f6fd',

      'purple-600': '#421c63',
      'purple-400': '#6a2ea0',
      'purple-300': '#c3abd9',
      'purple-200': '#e1d5ec',
      'purple-100': '#f8f5fa',

      'rose-tinted-600': '#4d003a',
      'rose-tinted-400': '#9a0074',
      'rose-tinted-300': '#d799c7',
      'rose-tinted-200': '#ebcce3',
      'rose-tinted-100': '#faf2f8',

      // Attention colors
      'mint-600': '#00b39e',
      'mint-400': '#00e4ca',
      'mint-200': '#ccfaf4',
      'mint-300': '#99f4ea',
      'mint-100': '#f2fefc',

      'yellow-600': '#e6cf00',
      'yellow-400': '#fff066',
      'yellow-200': '#fffce0',
      'yellow-300': '#fff9c2',
      'yellow-100': '#fffef7',

      transparent: 'transparent',
      'current-color': 'currentColor',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '12px',
        md: '24px',
      },
    },
    extend: {
      spacing: {
        4.5: 4.5 * 4,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
