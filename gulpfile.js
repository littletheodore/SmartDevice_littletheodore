"use strict";

const gulp = require("gulp");
const gulpif = require("gulp-if");
const less = require("gulp-less");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const gcmq = require("gulp-group-css-media-queries");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const del = require("del");
const server = require("browser-sync").create();
const minify = require("gulp-minify");

//var isDev = (process.argv.indexOf('--dev') !== -1);

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    //.pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gcmq())
    .pipe(csso())
    .pipe(rename("style-min.css"))
    //.pipe(gulpif(isDev, sourcemaps.write()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("source/img/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo(),
    ]))
    .pipe(gulp.dest("build/img"))
    .pipe(server.stream());
});

gulp.task("webp", function () {
  return gulp.src("build/img/*.{png,jpg}")
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest("build/img"));
});

gulp.task("js", function () {
  return gulp.src("source/js/*.js")
    .pipe(minify())
    .pipe(gulp.dest("build/js"))
    .pipe(server.stream());
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"))
    .pipe(server.stream());
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/*.{woff,woff2}",
       //"source/js/*.js",
      "source/img/*.*"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/img/**/*.*", gulp.series("images", "webp"));
  gulp.watch("source/*.html", gulp.series("html"));
  gulp.watch("source/js/*.js", gulp.series("js"));
});


gulp.task("build", gulp.series("clean", "copy", "css", "html", "js"));
gulp.task("start", gulp.series("build", "server"));
