'use strict';

let gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ["last 5 versions"], cascade: false }))
        .pipe(gulp.dest('src/css'))
        .pipe(cssnano({ zindex: false }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream({ match: '**/*.css' }));;
});

gulp.task('code', function () {
    return gulp.src([
        'src/**/*.html'
    ])
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('browserSync', function () {
    browserSync.init({
        watch: true,
        server: "./src/"
    });
});

gulp.task('watch', gulp.parallel('sass', 'browserSync', 'code', function startWatching() {
    gulp.watch('src/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('src/**/*.html', gulp.parallel('code')).on('change', browserSync.reload);
}));

// Default Gulp function
gulp.task('default', gulp.parallel('watch'));