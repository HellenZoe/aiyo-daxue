var gulp = require('gulp');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var gulpif = require('gulp-if');
var del = require('del');
var uglify = require('gulp-uglify');


gulp.task('clean', function() {
  del(['./public/javascripts/', './public/stylesheets/']);
})


gulp.task('style', function() {
  return gulp.src('src/less/*.less')
  .pipe(less())
  .pipe(gulp.dest('./public/stylesheets/'));
})

gulp.task('js', function() {
  return gulp.src('./src/js/*.js')
  .pipe(gulp.dest('./public/javascripts/'))
})

gulp.task('build:js', function() {
  return gulp.src('./src/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('./public/javascripts/'));
})


gulp.task('build:style', function() {
  return gulp.src('./src/less/*.less')
  .pipe(less())
  .pipe(cleanCss())
  .pipe(gulp.dest('./public/stylesheets/'))
})

gulp.task('watch', ['style', 'js'], function() {
  gulp.watch('./src/less/*.less', ['style']);
  gulp.watch('./src/js/*.js', ['js']);
})

gulp.task('build', ['build:js', 'build:css']);
