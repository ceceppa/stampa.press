/* eslint import/no-extraneous-dependencies: ["error", {"optionalDependencies": false}] */
/* eslint import/no-extraneous-dependencies: ["error", {"optionalDependencies": false}] */

// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

const webpackConfig = require('../../webpack/webpack.test.config');

module.exports = function (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha', 'sinon-chai', 'jquery-1.8.3'],
    reporters: ['spec', 'coverage'],
    files: ['./index.js'],
    parallelOptions: {
      executors: 3, // Defaults to cpu-count - 1
      shardStrategy: 'round-robin',
      // shardStrategy: 'description-length'
    },
    preprocessors: {
      './index.js': ['webpack', 'sourcemap'],
    },
    plugins: [
      // Launchers
      'karma-chrome-launcher',

      // Test Libraries
      'karma-mocha',
      'karma-sinon-chai',

      // Preprocessors
      'karma-webpack',
      'karma-sourcemap-loader',

      // Reporters
      'karma-spec-reporter',
      'karma-coverage',
      // 'karma-phantomjs-launcher',
      'karma-parallel',
      'karma-jquery',
    ],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [{
        type: 'lcov',
        subdir: '.'
      }, {
        type: 'text-summary'
      }],
    },
  });
};