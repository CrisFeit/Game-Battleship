//Definição dos Modulos a serem utilizados no projeto
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const browserify = require('gulp-browserify');
const cleanCSS = require('gulp-clean-css');
function compress() {
    return gulp.src('./src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css'));
}

gulp.task('mainCss', compress);

function gulpJS() {
    return gulp.src('./src/js/*.js')
        .pipe(browserify(
            {
                transform: ['babelify'],
            }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
}

gulp.task('mainJs', gulpJS);

function watch() {
    gulp.watch('./src/css/*.css', compress);
    gulp.watch('./src/js/*.js', gulpJS);
}

gulp.task('watch', watch);

gulp.task('default', gulp.parallel( 'mainJs','mainCss'));