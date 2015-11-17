"use strict";

var gulp = require('gulp');
var concat = require("gulp-concat");
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var ts = require('gulp-typescript');

gulp.task("appJS", function () {
    gulp
		.src([
			"src/app.js",
			"src/services/**/*.js",
			"src/directives/**/*.js",
			"src/controllers/**/*.js",
		])
		.pipe(sourcemaps.init())
			.pipe(concat("app.js"))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("www"));
});

gulp.task("appTS", function () {
    gulp
		.src([
			"src/**/*.ts",
		])
		.pipe(sourcemaps.init())
			.pipe(ts({
				out: 'app.js'
			}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("www"));
});


gulp.task("less", function () {
    gulp
		.src([
			"style/**/*.less",
		])
		.pipe(sourcemaps.init())
			.pipe(concat("style.less"))
        .pipe(sourcemaps.write())
		.pipe(less())
		.pipe(gulp.dest("www/"));
});

gulp.task("watch", function () {
    gulp.watch('src/**/*.*', ['appTS']);
    gulp.watch('style/**/*.less', ['less']);
});

gulp.task('default', ['appTS', 'less']);
