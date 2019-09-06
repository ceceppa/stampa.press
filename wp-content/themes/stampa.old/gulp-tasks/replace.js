/* eslint-disable */
/**
 * Update theme version constant in file functions.php with current timestamp.
 */
const gulp = require('gulp');
const replace = require('gulp-string-replace');

gulp.task('replace', () => {
  gulp
    .src(['functions.php'])
    .pipe(
      replace(
        /define\(\s*'THEME_VERSION',\s*'(.*)'\s*\);/,
        `define( 'THEME_VERSION', '${new Date().getTime()}' );`
      )
    )
    .pipe(
      replace(
        /#REPLACE_ME#/,
        `define( 'THEME_VERSION', '${new Date().getTime()}' );`
      )
    )
    .pipe(gulp.dest('.'));
});
