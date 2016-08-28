var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

//function to handle errors
function handleError() {
    var args = Array.prototype.slice.call(arguments);
    plugins.notify.onError({
        title: 'compile error',
        message: '<%=error.message %>'
    }).apply(this, args);
    this.emit();
}

gulp.task('compile_scss_dev', function () {
    gulp.src('public/scss/app.scss')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass())
        .on('error', handleError)
        // .pipe(plugins.postcss([plugins.autoprefixer({
        //     "browsers":['iOS 7','> 5%']
        // })]))
        .pipe(plugins.rename('common.css'))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('concat_js_dev', function () {
    gulp.src('public/js/**/*.js')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('common.js', {
            newLine: ';\r\n'
        }))
        .on('error', handleError)
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('public/scripts'));
});

gulp.task('concat-libs-dev', function () {
    gulp.src([
        "public/lib-bower/jquery/dist/jquery.min.js"
    ]).pipe(plugins.concat('lib.js', {
        newLine: ";\r\n"
    })).pipe(gulp.dest("public/scripts"));
});

gulp.task('dev', plugins.sequence('compile_scss_dev', 'concat_js_dev', 'concat-libs-dev'));

gulp.task('watch', ['dev'], function () {
    gulp.watch('public/js/**/*.js', ['concat_js_dev']);
    gulp.watch('public/scss/**/*.scss', ['compile_scss_dev']);
});