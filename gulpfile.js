//Definição dos Modulos a serem utilizados no projeto
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const minify = require('gulp-minify');
const browserify = require('gulp-browserify');

function compress() {
    return gulp.src('./src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        // .pipe(minify())
        .pipe(gulp.dest('./battleship/css'));
}

gulp.task('mainCss', compress);

function gulpJS() {
    return gulp.src('./src/js/*.js')
        .pipe(browserify(
            {
                transform: ['babelify'],
            }))
        // .pipe(uglify())
        .pipe(gulp.dest('./battleship/js/'));
}

gulp.task('mainJs', gulpJS);

function watch() {
    gulp.watch('./src/css/*.css', compress);
    gulp.watch('./src/js/*.js', gulpJS);
}

gulp.task('watch', watch);

gulp.task('default', gulp.parallel( 'mainJs','mainCss'));