/* Import Node Modules ----------------------------------------------------- */
var browserSync = require('browser-sync').create(),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    rimraf = require('gulp-rimraf'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    args = require('yargs').argv,
    utils = require('gulp-util'),
    sass = require('gulp-sass'),
    gulp = require('gulp');

/* Clean Task -------------------------------------------------------------- */
gulp.task('clean', function() {
  return gulp.src(['dist'], { read: false }).pipe(rimraf());
});

/* JavaScript Task --------------------------------------------------------- */
gulp.task('javascript', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(rename('app.min.js'))
    .pipe(uglify({
      mangle: true,
      compress: true
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream: true}));
});

/* Sass Task --------------------------------------------------------------- */
gulp.task('sass', function() {
  return gulp.src('src/sass/**/*.scss')
    .pipe(plumber(function(error) {
      utils.log(utils.colors.red(error.message));
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

/* Libraries Task ---------------------------------------------------------- */
gulp.task('libraries', function() {
  return gulp.src('src/lib/**/*')
  .pipe(gulp.dest('dist/lib/'))
  .pipe(browserSync.reload({stream: true}));
});

/* HTML Task --------------------------------------------------------------- */
gulp.task('html', function() {
  return gulp.src('src/*.html')
  .pipe(gulp.dest('dist/'))
  .pipe(browserSync.reload({stream: true}));
});

/* Default Watch Task ------------------------------------------------------ */
gulp.task('default', ['clean'], function() {
  gulp.start('libraries');
  gulp.start('javascript');
  gulp.start('html');
  gulp.start('sass');
  browserSync.init({
    server: { baseDir: 'dist/' },
    logFileChanges: false,
    injectChanges: true,
    proxy: args.proxy,
    port: 8009
  });
  gulp.watch('src/js/**/*.js', ['javascript']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/**/*.html', ['html']);
});
