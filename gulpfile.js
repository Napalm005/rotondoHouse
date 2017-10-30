'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	prefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	cssmin = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	rimraf = require('rimraf'),
	rename = require('gulp-rename'),
	order = require('gulp-order'),
	concat = require('gulp-concat'),
	browserSync = require("browser-sync"),
	plumber = require('gulp-plumber'),
	include = require("gulp-include"),
	gcmq = require('gulp-group-css-media-queries'),
	svgstore = require('gulp-svgstore'),
	inlinesource = require('gulp-inline-source'),
	svgmin = require('gulp-svgmin'),
	pathFnc = require('path'),
	reload = browserSync.reload;


gulp.task('webserver', function () {
	browserSync(config);
});
var path = {
	public: {
		js: '../public/js/',
		json: '../public/json/',
		css: '../public/css/',
		// inlineStyle: '../public/css/inline/',
		img: '../public/img/',
		fonts: '../public/fonts/'
	},
	build: {
		html: 'build/',
		js: 'build/js/',
		json: 'build/json/',
		css: 'build/css/',
		// inlineStyle: 'build/css/',
		inlineStyle: 'src/templates/parts/inline/',
		img: 'build/img/',
		fonts: 'build/fonts/'
	},
	src: {
		html: 'src/*.html',
		js: 'src/js/parts/*.js',
		js_vendor: 'src/js/vendors/*.js',
		json: 'src/json/**/*.json',
		style: 'src/style/**/*.scss',
		inlineStyle: 'src/style/inline/**/*.scss',
		img: 'src/img/**/*.*',
		svgIcons: 'src/img/sprite/**/*.*',
		// svgIconsNoDestruct: 'src/img/svg/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		json: 'src/json/**/*.json',
		style: 'build/css/style.css',
		style: 'src/style/**/*.scss',
		inlineStyle: 'src/style/inline/**/*.scss',
		img: 'src/img/**/*.*',
		svgIcons: 'src/img/sprite/**/*.*',
		// svgIconsNoDestruct: 'src/img/svg/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	clean: './build',
	remove : {
		build : './build',
		public : '../public',
		modules : './node_modules'
	}
};

var config = {
	server: {
		baseDir: "./build"
	},
	// tunnel: true,
	tunnel: false,
	host: 'localhost',
	port: 9000,
	logPrefix: "Hamitsu"
};

gulp.task('clean', function (cb) {
	rimraf(path.clean, cb);
});

gulp.task('remove', function (cb) {
	rimraf(path.remove.modules, cb);
	rimraf(path.remove.build, cb);
	rimraf(path.remove.public, cb);
});

gulp.task('html:build', function () {
	gulp.src(path.src.html)
	.pipe(inlinesource())
	.pipe(include())
	.pipe(gulp.dest(path.build.html))
	.pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
	gulp.src(path.src.js)
	.pipe(include())
	.pipe(plumber())
	.pipe(concat("scripts.js"))
	.pipe(gulp.dest(path.build.js))
	.pipe(gulp.dest(path.public.js))
	.pipe(uglify())
	.pipe(rename("scripts.min.js"))
	.pipe(gulp.dest(path.public.js))
	.pipe(gulp.dest(path.build.js))

	gulp.src(path.src.js_vendor)
	.pipe(include())
	.pipe(plumber())
	.pipe(concat("vendors.js"))
	.pipe(gulp.dest(path.public.js))
	.pipe(gulp.dest(path.build.js))
	.pipe(uglify())
	.pipe(rename('vendors.min.js'))
	.pipe(gulp.dest(path.public.js))
	.pipe(gulp.dest(path.build.js))

	.pipe(reload({stream: true}));
});

gulp.task('json:build', function() {
	gulp.src(path.src.json)
	.pipe(plumber())
	.pipe(gulp.dest(path.build.json))
	.pipe(gulp.dest(path.public.json));
});

gulp.task('style:build', function () {
	gulp.src(path.src.style)
	.pipe(plumber())
	.pipe(order([
		"base/mixin.scss",
		"base/normalize.scss",
		"vendors/**/*.scss",
		"ui/**/*.scss",
		"layout/**/*.scss",
		"page/**/*.scss"
	]))
	.pipe(sourcemaps.init())
	.pipe(concat("style.scss"))
	.pipe(sass({
		includePaths: ['style/style.scss'],
		outputStyle: 'compact',
		sourceMap: false,
		errLogToConsole: true
	}))
	.pipe(prefixer({browsers: ['last 16 versions']}))
	.pipe(gcmq())
	.pipe(gulp.dest(path.public.css))
	.pipe(gulp.dest(path.build.css))
	.pipe(reload({stream: true}))
	.pipe(cssmin())
	.pipe(rename('style.min.css'))
	.pipe(gulp.dest(path.public.css))
	.pipe(gulp.dest(path.build.css));
});

gulp.task('inline-css:build', function () {
	gulp.src(path.src.inlineStyle)
	.pipe(plumber())
	.pipe(concat("inline.scss"))
	.pipe(sass({
		includePaths: ['style/inline.scss'],
		outputStyle: 'compact',
		sourceMap: false,
		errLogToConsole: true
	}))
	.pipe(prefixer({browsers: ['last 16 versions']}))
	.pipe(gcmq())
	.pipe(cssmin())
	.pipe(rename('inline.html'))
	// .pipe(gulp.dest(path.public.css))
	.pipe(gulp.dest(path.build.inlineStyle))
	.pipe(reload({stream: true}));
});

// Генерирует svg спрайт из иконок, которым нельзя менять цвет
// gulp.task('svg-no-destruct', function () {
// 	return gulp.src(path.src.svgIconsNoDestruct)
// 	.pipe(svgmin(function (file) {
// 		var prefix = pathFnc.basename(file.relative, pathFnc.extname(file.relative));
// 		return {
// 			plugins: [{
// 				cleanupIDs: {
// 					prefix: prefix + '-',
// 					minify: true
// 				}
// 			}]
// 		}
// 	}))
// 	.pipe(rename({prefix: 'icon-'}))
// 	.pipe(svgstore())
// 	.pipe(gulp.dest(path.public.img))
// 	.pipe(gulp.dest(path.build.img))
// 	.pipe(reload({stream: true}));
// });

// Генерирует svg спрайт из иконок, которым можно менять цвет
gulp.task('svg', function () {
    return gulp.src(path.src.svgIcons)
      .pipe(svgmin(function (file) {
          var prefix = pathFnc.basename(file.relative, pathFnc.extname(file.relative));
          return {
              plugins: [{
                      cleanupIDs: {
                          prefix: prefix + '-',
                          minify: true
                      }
                  }, {
                      removeAttrs: {
                          attrs: ['fill', 'stroke']
                      }
                  }]
          }
      }))
      .pipe(rename({prefix: 'icon-'}))
      .pipe(svgstore())
      .pipe(gulp.dest(path.public.img))
      .pipe(gulp.dest(path.build.img))
			.pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
	gulp.src(path.src.img)
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()],
		interlaced: true
	}))
	.pipe(gulp.dest(path.public.img))
	.pipe(gulp.dest(path.build.img))
	.pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
	gulp.src(path.src.fonts)
	.pipe(gulp.dest(path.public.fonts))
	.pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
	'js:build',
	'json:build',
	'style:build',
	'fonts:build',
	'image:build',
	'inline-css:build',
	'html:build',
	// 'svg-no-destruct',
	'svg'
]);

gulp.task('watch', function(){
	watch([path.watch.img], function(event, cb) {
		gulp.start('image:build');
	});
	watch([path.watch.html], function(event, cb) {
		setTimeout(function () {
			gulp.start('html:build');
		}, 1000);
	});
	watch([path.watch.style], function(event, cb) {
		setTimeout(function () {
			gulp.start('style:build');
		}, 1000);
	});
	watch([path.watch.inlineStyle], function(event, cb) {
		setTimeout(function () {
			gulp.start('inline-css:build');
		}, 1000);
	});
	watch([path.watch.js], function(event, cb) {
		setTimeout(function () {
			gulp.start('js:build');
		}, 1000);
	});
	watch([path.watch.svgIcons], function(event, cb) {
		setTimeout(function () {
			gulp.start('svg');
		}, 1000);
	});
	// watch([path.watch.svgIconsNoDestruct], function(event, cb) {
	// 	setTimeout(function () {
	// 		gulp.start('svg-no-destruct');
	// 	}, 1000);
	// });
	watch([path.watch.json], function(event, cb) {
		setTimeout(function () {
			gulp.start('json:build');
		}, 1000);
	});
	watch([path.watch.fonts], function(event, cb) {
		gulp.start('fonts:build');
	});
});

gulp.task('default', ['build','webserver', 'watch']);
gulp.task('prod', ['clean', 'build', 'watch']);
