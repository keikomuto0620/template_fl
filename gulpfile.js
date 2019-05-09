var gulp = require("gulp");

var ejs = require("gulp-ejs"),
    fs = require("fs"),
    sass = require("gulp-sass"),
    // sass = require("gulp-ruby-sass"),
    pleeease = require("gulp-pleeease"),
    plumber = require('gulp-plumber'),
    imagemin = require("gulp-imagemin"),
    pngquant = require('imagemin-pngquant'),
    mozjpeg = require('imagemin-mozjpeg'),
    browser = require("browser-sync");

var DEV = "src",
    PUBLIC = "dist";

//ejs
gulp.task("ejs", function() {
    var json = JSON.parse(fs.readFileSync('src/views/common/meta.json'));
    return gulp.src(
        [DEV + "/views/**/*.ejs",'!' + DEV + "/views/**/_*.ejs"]
    )
        .pipe(plumber())
        .pipe(ejs({json},{},{ext:'.html'}))
        .pipe(gulp.dest(PUBLIC))
        .pipe(browser.reload({stream:true}));
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
// gulp.task("style", function() {
//     return gulp.src(DEV + "/assets/styles/**/*.scss")
//         .pipe(sass({
//             style:"compressed",
//             compass : true,
//             "sourcemap=none": true
//         }))
//         .pipe(pleeease({
//             fallbacks: {
//                 autoprefixer: ["last 2 version", "ie 11"]
//             },
//             minifier: false
//         }))
//         .pipe(gulp.dest(PUBLIC + "/assets/styles"))
//         .pipe(browser.reload({stream:true}));
// });

//copy
gulp.task("js", function() {
    return gulp.src(DEV + "/assets/scripts/**/*.js")
        .pipe(gulp.dest(PUBLIC + "/assets/scripts"));
});

//lib
// gulp.task("lib", function() {
//     return gulp.src(DEV + "/lib/**/*.js")
//         .pipe(gulp.dest(PUBLIC + "/lib"));
// });

//browser sync
gulp.task("server", function() {
    browser({
        server: {
            baseDir: PUBLIC
        },
        port: 5000
    });
});

//images
// gulp.task("images", function() {
//     return gulp.src(DEV + "/assets/images/**/*")
//         .pipe(gulp.dest(PUBLIC + "/assets/images"));
// });

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
gulp.task("default", gulp.series( gulp.parallel("ejs","style","js","images"), "server", function() {
    // ,["ejs","style","js","images","server"], function() {
    gulp.watch(DEV + "/views/**/*.ejs",gulp.task("ejs"));
    gulp.watch(DEV + "/assets/styles/**/*.scss",gulp.task("style"));
    gulp.watch(DEV + "/assets/scripts/**/*.js",gulp.task("js"));
    // gulp.watch(DEV + "lib/**/*.js",gulp.task("lib"));
    gulp.watch(DEV + "/assets/images/**/*",gulp.task("images"));
}));