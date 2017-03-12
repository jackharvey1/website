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
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const scsslint = require('gulp-scss-lint');
const purify = require('gulp-purifycss');

gulp.task('build', ['scss', 'js']);

gulp.task('scss', function () {
    gulp.src('./public/scss/master.scss')
        .pipe(scsslint({
            'config': 'scsslint.yml'
        }))
        .pipe(autoprefixer())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(purify(['./public/js/*.js', './public/views/**/*.hbs']))
        .pipe(gulp.dest('./public/css/'))
        .pipe(livereload());
});

gulp.task('js', function () {
    return browserify({ entries: './public/js/main.js', debug: true })
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

gulp.task('server', ['build'], function () {
    nodemon({
        script: 'app.js'
    }).on('restart', function() {
        console.log('Restarted');
    });
});

gulp.task('watch', ['build'], function() {
    gulp.watch('./public/scss/*.scss', ['scss']);
    gulp.watch('./public/js/*.js', ['js']);
    gulp.watch('./public/views/**/*.hbs', ['build']);
});

gulp.task('default', ['server', 'watch']);
