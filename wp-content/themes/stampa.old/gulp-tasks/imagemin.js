/* eslint-disable */
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('imagemin', () => {
  return gulp.src('assets/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('assets/img'))
});
