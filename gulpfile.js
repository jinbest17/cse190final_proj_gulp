const gulp = require('gulp');
const image = require('gulp-image');
const clean = require('gulp-clean');
//const copy = require('gulp-copy');
const cleanCSS = require('gulp-clean-css'); 
const del = require('del');
const uglify = require('gulp-uglify')
// clean build directory
gulp.task('clean', function (done){
  del('build/**', {force: true});
  done();
});

// copy all files
gulp.task('copy', function() {
  gulp.src('./catalog/**')
    .pipe(gulp.dest('./build/catalog'));
  gulp.src('./_about/**')
    .pipe(gulp.dest('./build/_about'));
  gulp.src(['./_resources/bootstrap/**'])
    .pipe(gulp.dest('./build/_resources/bootstrap'));
  gulp.src(['./_resources/fonts/**'])
    .pipe(gulp.dest('./build/_resources/fonts'));
  gulp.src('./academics/**')
    .pipe(gulp.dest('./build/academics'));
  gulp.src('./common/**')
    .pipe(gulp.dest('./build/common'));
  gulp.src('./about/**')
    .pipe(gulp.dest('./build/about'));
  gulp.src('./favicon.ico')
    .pipe(gulp.dest('./build'));
  gulp.src('./index.html')
    .pipe(gulp.dest('./build'));
});

// minify images with customized settings
gulp.task('image', async () => {
    await gulp.src('./_images/**')
      .pipe(image({
        optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
        pngquant: ['--speed=1', '--force', 256],
        zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
        jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
        mozjpeg: ['-optimize'],
        gifsicle: ['--optimize'],
        svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors']
      }))
      .pipe(gulp.dest('./build/_images'));
    await gulp.src('./_resources/img/**')
      .pipe(image({
        optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
        pngquant: ['--speed=1', '--force', 256],
        zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
        jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
        mozjpeg: ['-optimize', '-progressive'],
        gifsicle: ['--optimize'],
        svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors']
      }))
      .pipe(gulp.dest('./build/_resources/img'));
  });

  gulp.task('minify-css', () => {
    // Folder with files to minify
    return gulp.src('./_resources/css/**/*.css')
    //The method pipe() allow you to chain multiple tasks together 
    //I execute the task to minify the files
   .pipe(cleanCSS())
   //I define the destination of the minified files with the method dest
   .pipe(gulp.dest('./build/_resources/css'));
  });

  gulp.task('uglify-js', function() {
    return gulp.src('./_resources/js/**')
                .pipe(uglify())
                .pipe(gulp.dest('./build/_resources/js'))
  })

  gulp.task('build', ['clean', 'copy', 'minify-css', 'image', 'uglify-js']);