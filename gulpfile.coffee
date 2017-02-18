gulp = require 'gulp'

gulp.task 'build',  ->
    browserify = require 'browserify'
    source = require 'vinyl-source-stream'
    rename = require 'gulp-rename'
    uglify = require 'gulp-uglify'
    buffer = require 'vinyl-buffer'

    browserify
        entries: './src/main.coffee'
        extensions: ['.coffee']
        detectGlobals: false
    .transform('coffeeify', bare: true)
    .bundle()
    .pipe source 'bundle.js'
    .pipe rename 'goblin.js'
    .pipe gulp.dest './dist'
    .pipe buffer()
    .pipe uglify()
    .pipe rename 'goblin.min.js'
    .pipe gulp.dest './dist'