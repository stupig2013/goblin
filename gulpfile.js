const gulp = require('gulp')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const rename = require('gulp-rename')

gulp.task('build',  () => {
    browserify({
        entries: './src/main.js',
        extensions: ['.js'],
        detectGlobals: false
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(rename('goblin.js'))
    .pipe(gulp.dest('./lib'))
})