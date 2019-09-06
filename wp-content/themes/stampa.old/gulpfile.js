/* eslint-disable */
const fs = require('fs');
const gulp = require('gulp');
const tasks = fs.readdirSync('./gulp-tasks/');
const spawn = require('child_process').spawn;

require('dotenv').config();

tasks.forEach(task => {
  if (task !== 'pizza.js') {
    require('./gulp-tasks/' + task);
  }
});

const runAdminStyles = () => {
  const adminCSS = spawn('npm', ['run', 'admin:css']);  
  adminCSS.stdout.on('data', function(msg){         
    console.log(`[PostCSS] ${msg.toString()}`)
  });
};

const runCompile = env => {
  const spawnJS = spawn('npm', ['run', `${env}:js`]);     
  const spawnCSS = spawn('npm', ['run', `${env}:css`]);
  
  spawnJS.stdout.on('data', function(msg){         
    console.log(`[JavaScript 💩 ] ${msg.toString()}`)
  });
  spawnCSS.stdout.on('data', function(msg){         
    console.log(`[PostCSS 🐛 ] ${msg.toString()}`)
  });
  runAdminStyles();
};

gulp.task('production', () => {
  runCompile('prod');
});
gulp.task('development', () => {
  runCompile('dev');
});

// Run all the above tasks
gulp.task('build', ['svgsprite', 'imagemin', 'production', 'replace']);
gulp.task('default', ['watch']);

gulp.task('watch', ['development'], () => {
  gulp.watch('assets/img/svg/*.svg', ['svgsprite']);
});
