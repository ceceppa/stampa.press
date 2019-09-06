/* eslint-disable */
const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprites');

const config = {
  mode: 'symbols',
};

gulp.task('svgsprite', () => gulp
    .src('assets/img/svg/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('assets/dist')));
