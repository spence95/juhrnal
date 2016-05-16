var gulp        = require('gulp'),
  childProcess  = require('child_process'),
  electron      = require('electron-prebuilt');

gulp.task('run', function() {
  childProcess.spawn(electron, ['./main.js'], { stdio: 'inherit' });
});
