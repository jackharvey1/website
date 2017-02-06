const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');

gulp.task('build', ['scss', 'js']);

gulp.task('scss', function () {
    gulp.src('./public/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'))
        .pipe(livereload());
});

gulp.task('js', function () {
    return browserify({ entries: ['./public/js/home.js'], debug: true })
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('main.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
            .on('error', function (err) {
                console.error(err.message);
            })
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./public/js/'))
        .pipe(livereload());
});

gulp.task('server', function () {
    nodemon({
        script: 'app.js'
    }).on('restart', function() {
        console.log('Restarted');
    });
});

gulp.task('watch', ['build'], function() {
    gulp.watch('./public/sass/*.scss', ['scss']);
    gulp.watch('./public/js/*.js', ['js']);
});

gulp.task('default', ['server', 'watch']);
