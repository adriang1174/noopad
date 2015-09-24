var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    mainBowerFiles = require('main-bower-files'),
    gulpNgConfig = require('gulp-ng-config'),
    print = require('gulp-print'),

    input = {
        'html': 'source/*.html',
        'sass': 'source/sass/**/*.scss',
        'javascript': 'source/javascript/**/*.js',
        'vendor_css': 'bower_components/html5-boilerplate/css/*.css',
        'config': 'noopad.config'
    },

    output = {
        'html': 'dist',
        'stylesheets': 'dist/css',
        'javascript': 'dist/js'
    };

/* run javascript through jshint */
gulp.task('jshint', function () {
    return gulp.src(input.javascript)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

/* concat javascript files, minify if --type production */
gulp.task('build-js', function () {
    makeConfig();
    return gulp.src(input.javascript)
        .pipe(print())
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        //only uglify if gulp is ran with '--type production'
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.javascript));
});

function makeConfig () {
    gulp.src('./config.json')
        .pipe(gulpNgConfig(input.config, {
            environment: 'local'
        }))
        .pipe(gulp.dest('source/javascript'));
}

/* concat javascript files, minify if --type production */
/* From http://blog.simontimms.com/2015/01/22/getting-bower-components-in-gulp/ */
gulp.task('build-vendor-js', function () {
    return gulp.src(mainBowerFiles())
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        //only uglify if gulp is ran with '--type production'
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.javascript));
});

/* compile scss files */
gulp.task('build-css', function () {
    return gulp.src(input.sass)
        .pipe(sourcemaps.init())
        .pipe(compass({
            css: 'dist/css',
            sass: 'source/sass'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.stylesheets));
});

/* copy vendor css files */
gulp.task('copy-css', function () {
    return gulp.src(input.vendor_css)
        .pipe(gulp.dest(output.stylesheets));
});

/* copy any html files to dist */
gulp.task('copy-html', function () {
    return gulp.src(input.html)
        .pipe(gulp.dest(output.html));
});

/* Watch these files for changes and run the task on update */
gulp.task('watch', function () {
    gulp.watch(input.javascript, ['jshint', 'build-js']);
    gulp.watch(input.sass, ['build-css']);
    gulp.watch(input.html, ['copy-html']);
});


/* Build dist */
gulp.task('default', ['jshint', 'build-js', 'build-vendor-js', 'build-css', 'copy-css', 'copy-html', 'watch']);
