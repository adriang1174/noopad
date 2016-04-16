var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpNgConfig = require('gulp-ng-config'),
    print = require('gulp-print'),
    del = require('del'),
    connect = require('gulp-connect'),

    input = {
        'html':         'source/**/*.html',
        'sass':         'source/**/*.scss',
        'javascript':   'source/**/*.js',
        'vendor_css':   [
                            'bower_components/ng-materialize/dist/ng-materialize.min.css',
                            'bower_components/waves/dist/waves.min.css',
                            'bower_components/angular-hotkeys/build/hotkeys.min.css'                         
                        ],
        'vendor_js':    [
                            'bower_components/angular/angular.js',
                            'bower_components/angular-route/angular-route.js',
                            'bower_components/ngDropbox/dropbox.js',
                            'bower_components/ng-materialize/dist/ng-materialize.js',
                            'bower_components/angular-animate/angular-animate.js',
                            'bower_components/waves/dist/waves.js',
                            'bower_components/angular-hotkeys/build/hotkeys.js',
                            'bower_components/marked/lib/marked.js',
                            'bower_components/angular-marked/dist/angular-marked.js'
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
    // if (!exist /source/config.js) {
    //     configure();   
    // }
    return gulp.src(input.javascript)
        //.pipe(print())
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        //.pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.javascript));
});

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
        //.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(output.stylesheets));
});

gulp.task('build-vendor-css', function () {
    return gulp.src(input.vendor_css)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(output.stylesheets));
});

gulp.task('copy-html', function () {
    return gulp.src(input.html)
        .pipe(gulp.dest(output.html));
});

gulp.task('copy-readme', function () {
    return gulp.src('README.md')
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch(input.javascript, ['jshint', 'build-js']);
    gulp.watch(input.sass, ['build-css']);
    gulp.watch(input.html, ['copy-html']);
    gulp.watch([output.dist + '/**/*.*'], ['reload']);
});

gulp.task('reload', function () {
  gulp.src(output.dist + '/**/*.*')
    .pipe(connect.reload());
});

gulp.task('connect', function() {
    connect.server({
    root: 'dist',
    livereload: true
  });
});

function configure() {
    //var env = (gutil.env.type === 'production' ? 'production' : 'localhost');
    console.log('YIR! were going to ' + gutil.env.type);
    gulp.src('./config.json')
        .pipe(gulpNgConfig(input.config, {
            environment: gutil.env.type
        }))
        .pipe(gulp.dest('source'));
}

// This generates source/config.js
gulp.task('configure', configure);

function clean() {
    del([output.dist, 'source/config.js']);
}

gulp.task('clean', clean);

gulp.task('default', ['jshint', 'build-js', 'build-vendor-js', 'build-css', 'build-vendor-css', 'copy-html', 'copy-readme', 'watch', 'connect']);

gulp.task('dist', ['build-js', 'build-vendor-js', 'build-css', 'build-vendor-css', 'copy-html', 'copy-readme']);
