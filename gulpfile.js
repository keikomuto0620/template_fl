const gulp = require('gulp');

const plumber = require('gulp-plumber');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const browserSync = require('browser-sync');
const watch = require('gulp-watch');

const ejs = require('gulp-ejs');
const fs = require('fs');
const data = require('gulp-data');
const rename = require('gulp-rename');

const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');

let $ = require('gulp-load-plugins')();

const DEV = 'src',
    PUBLIC = 'dist';

//style
gulp.task('style', () => {
    return gulp.src(DEV + '/assets/styles/**/*.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'})).on('error', sass.logError)
    .pipe(autoprefixer({browsers: ['last 2 versions', 'ie >= 11']}))
    .pipe(gulp.dest(PUBLIC + '/assets/styles'))
});

//js
gulp.task('js', function() {
    return gulp.src(DEV + '/assets/scripts/**/*.js')
        .pipe(gulp.dest(PUBLIC + '/assets/scripts'));
});

//images
gulp.task('images', function() {
    return gulp.src(DEV + '/assets/images/**/*.{png,jpg,gif,svg}')
    .pipe(imagemin([
        pngquant({
            quality: [ 0.65, 0.8 ],
            speed: 1,
            floyd: 0
        }),
        mozjpeg({
            quality: 85,
            progressive: true
        }),
        imagemin.svgo(),
        imagemin.optipng(),
        imagemin.gifsicle()
    ]))
    .pipe(gulp.dest((PUBLIC + '/assets/images')));
});

//ejs
gulp.task('ejs', () => {
    var json = JSON.parse(fs.readFileSync(DEV +'/views/common/meta.json'));
    return gulp.src(
        [DEV + '/views/**/*.ejs','!' + DEV + '/views/**/_*.ejs']
    )
        .pipe($.plumber())
        .pipe($.data(file => {
            return {
              'filename': file.path
          }
          }))
        .pipe($.ejs())
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest(PUBLIC))
});

// sever
gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: PUBLIC
        },
        port: 5000,
        // startPath: `${BASE_PATH}`,
        // ghostMode: false
    });
    watch([DEV + '/views/**/*.ejs'], gulp.series('ejs', browserSync.reload));
    watch([DEV + '/assets/styles/**/*.scss'], gulp.series('style', browserSync.reload));
    watch([DEV + '/assets/scripts/**/*.js'], gulp.series('js', browserSync.reload));
    watch([DEV + '/assets/images/**/*.js'], gulp.series('images', browserSync.reload));
});
gulp.task('server', gulp.series('browser-sync'));

// default
gulp.task('build', gulp.parallel('ejs','style','js','images'));
gulp.task('default', gulp.series('build', 'server'));