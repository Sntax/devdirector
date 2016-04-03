/* Import Node Modules ----------------------------------------------------- */
var browserSync = require('browser-sync').create(),
    ngannotate = require('gulp-ng-annotate'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    rimraf = require('gulp-rimraf'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    args = require('yargs').argv,
    utils = require('gulp-util'),
    sass = require('gulp-sass'),
    gulp = require('gulp');

/* Clean Task -------------------------------------------------------------- */
gulp.task('clean', function() {
  return gulp.src(['dist'], { read: false }).pipe(rimraf());
});

/* Images Task ------------------------------------------------------------- */
gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.reload({ stream: true }));
});

/* JavaScript Task --------------------------------------------------------- */
gulp.task('javascript', function() {
  return gulp.src([
      'src/js/app.js',
      'src/js/services.js',
      'src/js/controllers.js',
      'src/js/filters.js',
      'src/js/directives.js'
    ])
    .pipe(plumber(function(error) {
      utils.log(utils.colors.red(error.message));
      this.emit('end');
    }))
    .pipe(concat('app.js'))
    .pipe(rename('app.min.js'))
    .pipe(ngannotate())
    .pipe(uglify({
      mangle: true,
      compress: true
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({ stream: true }));
});

/* Sass Task --------------------------------------------------------------- */
gulp.task('sass', function() {
  return gulp.src('src/sass/**/*.scss')
    .pipe(plumber(function(error) {
      utils.log(utils.colors.red(error.message));
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream({ match: '**/*.css' }));
});

/* Libraries Task ---------------------------------------------------------- */
gulp.task('libraries', function() {
  return gulp.src('src/lib/**/*')
    .pipe(gulp.dest('dist/lib/'))
    .pipe(browserSync.reload({ stream: true }));
});

/* Fonts Task ---------------------------------------------------------- */
gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts/'))
    .pipe(browserSync.reload({ stream: true }));
});

/* HTML Task --------------------------------------------------------------- */
gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({ stream: true }));
});

/* Default Watch Task ------------------------------------------------------ */
gulp.task('default', ['clean'], function() {
  gulp.start('images');
  gulp.start('libraries');
  gulp.start('fonts');
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

  gulp.watch('src/img/**/*', ['images']);
  gulp.watch('src/js/**/*.js', ['javascript']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/**/*.html', ['html']);
});
