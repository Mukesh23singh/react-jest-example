var gulp = require('gulp'),
 source = require('vinyl-source-stream'),
 browserify = require('browserify');
// Load plugins
var $ = require('gulp-load-plugins')();

// Scripts
gulp.task('scripts', function () {
    return  browserify({
      entries: ['./app/js/main.jsx']
    })
    .on('error', function(log) {
      console.log(log);
    })
    .bundle({debug:true})
    .on('error', function(log) {
      console.log(log);
    })
    .pipe(source('app.js'))
    // .pipe($.jshint('.jshintrc'))
    // .pipe($.jshint.reporter('default'))
    .pipe(gulp.dest('app/js'))

    .pipe($.connect.reload())

    .on('error', $.util.beep);
});

// Connect
gulp.task('connect', $.connect.server({
    root: ['app'],
    port: 9002,
    livereload: true
}));

gulp.task('watch', ['scripts', 'connect'], function () {
    gulp.watch(['app/js/**/*.js','app/js/**/*.jsx','!app/js/app.js'], ['scripts']);
});