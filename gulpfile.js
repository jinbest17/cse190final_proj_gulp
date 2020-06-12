const gulp = require('gulp');
const image = require('gulp-image');
const clean = require('gulp-clean');

// clean build directory
gulp.task('clean', function (){
    gulp.src('./build', {read: false})
        .pipe(clean({force: true}));
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

gulp.task('build', ['clean','image']);