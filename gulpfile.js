var gulp = require('gulp');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var gulpif = require('gulp-if');
var del = require('del');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var gulpPlumber = require('gulp-plumber');
// var strip = require('gulp-strip-comments');

//错误处理
function errHandler(err) {
  gutil.beep()
  gutil.log(err.toString());
}

gulp.task('clean', function() {
  del(['public/javascripts/*.js', 'public/stylesheets/*.css']);
})


gulp.task('style', function() {
  return gulp.src('./src/less/*.less')
  .pipe(gulpPlumber())
  .pipe(less())
  .pipe(gulp.dest('public/stylesheets'));
})

gulp.task('js', function() {
  return gulp.src('src/js/*.js')
  .pipe(gulpPlumber())
  .pipe(gulp.dest('public/javascripts'))
})

gulp.task('build:js', function() {
  return gulp.src('src/js/*.js')
  .pipe(gulpPlumber())
  .pipe(uglify())
  .pipe(gulp.dest('public/javascripts/'));
})


gulp.task('build:style', function() {
  return gulp.src('src/less/*.less')
  .pipe(gulpPlumber())
  .pipe(less())
  .pipe(cleanCss({compatibility: 'ie8', keepSpecialComments: 0}))
  .pipe(gulp.dest('public/stylesheets/'))
})

gulp.task('watch', ['style', 'js'], function() {
  gulp.watch('src/css/*.less', ['style']);
  gulp.watch('src/js/*.js', ['js']);
})

gulp.task('build', ['build:js', 'build:style']);
