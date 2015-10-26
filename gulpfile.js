var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpNgConfig = require('gulp-ng-config'),
    print = require('gulp-print'),
    del = require('del'),

    input = {
        'html':         'source/*.html',
        'sass':         'source/sass/**/*.scss',
        'javascript':   'source/javascript/**/*.js',
        'vendor_css':   [
                            'bower_components/ng-materialize/dist/ng-materialize.min.css',
                            'bower_components/waves/dist/waves.min.css'                            
                        ],
        'vendor_js':    [
                            'bower_components/angular/angular.js',
                            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                            'bower_components/ngDropbox/dropbox.js',
                            'bower_components/ng-materialize/dist/ng-materialize.js',
                            'bower_components/angular-animate/angular-animate.js',
                            'bower_components/waves/dist/waves.min.js'
                        ],
        'config': 'noopad.config'
    },

    output = {
        'dist': 'dist',
        'html': 'dist',
        'stylesheets': 'dist/css',
        'javascript': 'dist/js'
    };

gulp.task('jshint', function () {
    return gulp.src(input.javascript)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-js', function () {
    makeConfig();
    return gulp.src(input.javascript)
        .pipe(print())
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        //.pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.javascript));
});

function makeConfig () {
    var env = (gutil.env.type === 'production' ? 'production' : 'localhost');
    gulp.src('./config.json')
        .pipe(gulpNgConfig(input.config, {
            environment: env
        }))
        .pipe(gulp.dest('source/javascript'));
}

gulp.task('build-vendor-js', function () {
    return gulp.src(input.vendor_js)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
      //  .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.javascript));
});

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
gulp.task('build-vendor-css', function () {
    return gulp.src(input.vendor_css)
        .pipe(concat('vendor.css'))
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

function clean() {
    del([output.dist, 'source/javascript/config.js']);
}

gulp.task('clean', clean);

gulp.task('default', ['jshint', 'build-js', 'build-vendor-js', 'build-css', 'build-vendor-css', 'copy-html', 'watch']);

gulp.task('dist', ['build-js']);
