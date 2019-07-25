const gulp = require('gulp');

const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const watch = require('gulp-watch');
const del = require('del');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const stylelint = require('gulp-stylelint');
const sourcemaps = require('gulp-sourcemaps');

const ejs = require('gulp-ejs');
const fs = require('fs');
const data = require('gulp-data');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');

const uglify = require('gulp-uglify');

const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');

const DEV = 'src',
    PUBLIC = 'dist';

//style
gulp.task('style', () => {
    return gulp.src(DEV + '/assets/styles/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'})).on('error', sass.logError)
    .pipe(autoprefixer())
    .pipe(stylelint({
      reporters: [{formatter: 'verbose', console: true}],
      fix: true
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(PUBLIC + '/assets/styles'))
});

//js
gulp.task('js', function() {
    return gulp.src(DEV + '/assets/scripts/**/*.js','!/assets/scripts/**/*.min.js')
        // .pipe(uglify())
        // .pipe(rename({extname: '.min.js'}))
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
    var json = JSON.parse(fs.readFileSync(DEV +'/views/_data/meta.json','utf-8'));
    return gulp.src(
        [DEV + '/views/**/*.ejs','!' + DEV + '/views/**/_*.ejs']
    )
        .pipe(plumber())
        .pipe(data(file => {
            return {
              'filename': file.path
          }
          }))
        .pipe(ejs({json:json}))
        // .pipe(htmlmin({collapseWhitespace : true,removeComments : true}))
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest(PUBLIC))
});

// clean
// gulp.task('cleanIMG', (done) => {
//     del(PUBLIC + '/assets/images/**/*');
//     done();
// });
// gulp.task('cleanJS', (done) => {
//     del(PUBLIC + '/assets/scripts/**/*.js');
//     done();
// });
// gulp.task('cleanCSS', (done) => {
//     del(PUBLIC + '/assets/styles/**/*.css');
//     done();
// });
gulp.task('clean', (done) => {
    del(PUBLIC + '/**/*');
    done();
});

gulp.task('build', gulp.series('style','js','images','ejs'));

// sever
gulp.task('server', () => {
    browserSync({
        server: {
            baseDir: PUBLIC
        },
        port: 5000,
        open: 'external'
        // startPath: `${BASE_PATH}`,
        // ghostMode: false
    });
    // watch([DEV + '/**/*'], gulp.series('build', browserSync.reload));
    watch([DEV + '/views/**/*.ejs'], gulp.series('ejs', browserSync.reload));
    watch([DEV + '/assets/styles/**/*.scss'], gulp.series('style', browserSync.reload));
    watch([DEV + '/assets/scripts/**/*.js'], gulp.series('js', browserSync.reload));
    watch([DEV + '/assets/images/**/*'], gulp.series('images', browserSync.reload));
});


// default
gulp.task('default', gulp.series('clean','build','server'));