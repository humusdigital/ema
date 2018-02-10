var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var useref = require('gulp-useref');
var cache = require('gulp-cache');
var del = require('del');
var deleteLines = require('gulp-delete-lines');
var htmlmin = require('gulp-htmlmin');
var styleInject = require("gulp-style-inject");

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
})

gulp.task('css', function() {
  return gulp.src('app/css/**/*.css') // Gets all files ending with .css in app/css and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

// Watchers
gulp.task('watch', function() {
  gulp.watch('app/css/**/*.css', ['css']);
  gulp.watch('app/**/*.html', browserSync.reload);
  gulp.watch('app/**/*.js', browserSync.reload);
})

gulp.task('default', function(callback) {
  runSequence(['css', 'browserSync'], 'watch',
    callback
  )
})


// Cleaning
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Optimizing CSS and JavaScript
gulp.task('useref', function() {
  return gulp.src('app/*.html')
   .pipe(useref())
   .pipe(gulp.dest('dist'));
});

// Copying fonts
gulp.task('copyHome', function() {
  return gulp.src('app/home/*.html')
    .pipe(gulp.dest('dist/home'))
})

// Copying fonts
gulp.task('copysw', function() {
  return gulp.src('app/*.js')
    .pipe(gulp.dest('dist/'))
})

gulp.task('copyIcons', function() {
  return gulp.src('app/icon/*.*')
    .pipe(gulp.dest('dist/icon'))
})


gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    ['useref','copyHome','copysw','copyIcons'],
    callback
  )
})

gulp.task('close', function() {
  return gulp.src('dist/*.html')
  .pipe(styleInject())
  .pipe(deleteLines({
    'filters': [
    /<link\s+rel=["']stylesheet["']\s/i
    ]
  }))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('dist/'));
});

