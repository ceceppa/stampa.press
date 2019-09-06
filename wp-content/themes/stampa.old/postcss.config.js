/* eslint-disable */
module.exports = {
  plugins: [
    require('postcss-mixins')({
      mixinsDir: './assets/postcss/js/mixins',
    }),
    require('postcss-preset-env')({ stage: 0 }),
    require('cssnano')({
      autoprefixer: {
        grid: 'no-autoplace',
      },
    }),
    require('postcss-focus'),
    require('postcss-nested'),
    require('postcss-pxtorem')({
      mediaQuery: true,
    }),
    require('postcss-line-height-px-to-unitless'),
    require('postcss-extend-rule'),
  ],
};
