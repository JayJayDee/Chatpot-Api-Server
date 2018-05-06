
var gulp = require('gulp');
var typescript = require('gulp-tsc');
var runseq = require('run-sequence');
var spawn = require('child_process').spawn;

var paths = {
  tsPath: 'src/**/*.ts',
  assets: 'src/**/*.json',   
  jsPath: 'bin',
};

var node;
gulp.task('server', function() {
  if (node) node.kill();
  node = spawn('node', ['bin/container/app-runner.js'], {stdio: 'inherit'});
  node.on('close', function(code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('build', function(cb) {
  return gulp.src(paths.tsPath)
    .pipe(typescript({
      emitError: false,
      target: 'es2017',
      sourceMap: true,
      emitDecoratorMetadata: true,
      experimentalDecorators: true
    }))
    .pipe(gulp.dest(paths.jsPath));
});

gulp.task('copy-asset', function() {
  return gulp.src(paths.assets)
    .pipe(gulp.dest(paths.jsPath));
});

gulp.task('default', function () {
  runseq('build', 'copy-asset', 'server');
  gulp.watch([paths.tsPath, paths.assets], function() {
    runseq('build', 'copy-asset', 'server');
  });
});
 