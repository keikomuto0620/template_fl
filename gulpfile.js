var gulp = require("gulp");

var ejs = require("gulp-ejs");
var efs = require("fs");
var edata = require("gulp-data");
var esass = require("gulp-sass");
var epleeease = require("gulp-pleeease");
var eplumber = require('gulp-plumber');
var eimagemin = require("gulp-imagemin");
var epngquant = require('imagemin-pngquant');
var emozjpeg = require('imagemin-mozjpeg');
var browserSync = require("browser-sync");

let $ = require('gulp-load-plugins')();

var DEV = "src",
    PUBLIC = "dist";

//browser sync
gulp.task('browserSync', () => {
    return browserSync.init({
        server: {
            baseDir: PUBLIC
        },
        port: 5000,
        reloadOnRestart: true
    });
});
// gulp.task("server", function() {
//     browser({
//         server: {
//             baseDir: PUBLIC
//         },
//         port: 5000
//     });
// });

// reload
gulp.task("reload", (done) => {
    browserSync.reload();
    done();
});

//ejs
gulp.task("ejs", function() {
    var json = JSON.parse(fs.readFileSync('src/views/common/meta.json'));
    return gulp.src(
        [DEV + "/views/**/*.ejs",'!' + DEV + "/views/**/_*.ejs"]
    )
        .pipe($.plumber())
        .pipe($.data(file => {
            return {
              'filename': file.path
          }
          }))
        .pipe($.ejs({json},{},{ext:'.html'}))
        .pipe(gulp.dest(PUBLIC))
        // .pipe(browser.reload({stream:true}));
});

//style
gulp.task("style", function() {
  return (
    gulp.src(DEV + "/assets/styles/**/*.scss")
        .pipe(plumber())
        .pipe(sass({outputStyle: "compressed"}))
        .pipe(pleeease({
            fallbacks: {
                autoprefixer: ["last 2 version", "ie 11"]
            },
            minifier: false
        }))
      .pipe(gulp.dest(PUBLIC + "/assets/styles"))
  );
});

//copy
gulp.task("js", function() {
    return gulp.src(DEV + "/assets/scripts/**/*.js")
        .pipe(gulp.dest(PUBLIC + "/assets/scripts"));
});

//images
gulp.task("images", function() {
    return gulp.src(DEV + "/assets/images/**/*.{png,jpg,gif,svg}")
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
                ])) // 画像の圧縮処理
    .pipe(gulp.dest((PUBLIC + "/assets/images")));
});

//watch
gulp.task("default", gulp.series(
    gulp.parallel("ejs","style","js","images"),
    "server", function() {
    gulp.watch(DEV + "/views/**/*.ejs",gulp.task("ejs"));
    gulp.watch(DEV + "/assets/styles/**/*.scss",gulp.task("style"));
    gulp.watch(DEV + "/assets/scripts/**/*.js",gulp.task("js"));
    gulp.watch(DEV + "/assets/images/**/*",gulp.task("images"));
}));