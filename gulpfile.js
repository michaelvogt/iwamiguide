const gulp = require( 'gulp');
const useref = require( 'gulp-useref');
const uglify = require( 'gulp-uglify');
const gulpIf = require( 'gulp-if');
const cssnano = require( 'gulp-cssnano');
const del = require( 'del');
const runSequence = require( 'run-sequence')
const path = require('path');
const swPrecache = require('sw-precache');

const paths = {src: './app/'};

gulp.task('useref', function(){
  return gulp.src('app/**/*.html')
     .pipe( useref())
     // .pipe( gulpIf('*.js', uglify()))
     .pipe( gulpIf('*.css', cssnano()))
     .pipe( gulp.dest('dist'))
});

gulp.task('service-worker', function( callback) {
  swPrecache.write( path.join( paths.src, 'service-worker.js'), {
    staticFileGlobs: [
      paths.src + 'index.html',
      paths.src + 'static/*.*'
    ],
    importScripts: [
      'node_modules/sw-toolbox/sw-toolbox.js',
      'toolbox-script.js'
    ],
    stripPrefix: paths.src
  }, callback);
});

gulp.task('clean:dist', function() {
  return del.sync( 'dist');
})

gulp.task( 'build', function( callback) {
  runSequence( 'clean:dist', 
    ['useref'],
    callback
  )
})