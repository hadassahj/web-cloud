/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // <--- Aici era problema, aveai 'tailwindcss' simplu
    autoprefixer: {},
  },
};

export default config;