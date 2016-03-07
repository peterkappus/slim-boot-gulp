var gulp = require('gulp'),
    gutil       = require('gulp-util'),
    /* live reload stuff */
    livereload  = require('gulp-livereload'), // Livereload plugin needed: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
    slim        = require("gulp-slim"), //let's use slim too :)
    tinylr      = require('tiny-lr'),
    server      = tinylr(),
    express = require('express'),
    //jade        = require('gulp-jade'),
    app         = express(),
    path        = require('path');

gulp.task('express', function() {
  app.use(express.static(path.resolve('./dist')));
  app.listen(1337);
  gutil.log('Listening on port: 1337');
});


gulp.task('templates', function() {
  return gulp.src("src/*.slim")
    .pipe( slim() )
    .pipe(gulp.dest("dist/"))
    .pipe( livereload( server ));
  /*
  return gulp.src('src/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
    .pipe( livereload( server ));
  */
});

gulp.task('watch', function () {
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err);
    }    
    gulp.watch('src/*',['templates']);
  });
});

gulp.task('default',['express','templates','watch']);
