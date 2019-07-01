const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat')
const server = require('gulp-webserver');

const myServer = async () => {
    gulp.src('./')	// <-- your app folder
    .pipe(server({
        livereload: true,
        open: true,
        port: 8080	// set a port to avoid conflicts with other local apps
    }));
}

const myStaticServer = () => {
    gulp.src('./')	// <-- your app folder
    .pipe(server({
        open: true,
        port: 8080	// set a port to avoid conflicts with other local apps
    }));
}

//funcao para compilar o JS
const compilarJs = async () => {
    console.log('Compilando js...');
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(concat('codigo.min.js'))
        .pipe(gulp.dest('dist/js'))
}

//funcao para compilar o SASS
const compilarSass = async () => {
    console.log('Compilando sass...');
    return gulp.src('src/sass/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(uglifycss({
            "uglyComments": true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        
}

//Puxa o arquivo minificado do jquery para a pasta /dist
const callJquery = (cb) => {
    return gulp.src('node_modules/**/jquery.min.js')
        .pipe(gulp.dest('dist/js'))  
    cb();
}

// Puxa as imagens
const callIMgs = () => {
    return gulp.src('src/img/*.*')
        .pipe(gulp.dest('dist/img')); 
}

//observa mudancas
const myWatcher = () => {
    console.log('Observando...');
    gulp.watch('src/**/*.*', () => {
        console.log('Mudança...');
        compilarJs();
        compilarSass();
        setTimeout(myWatcher,0);
    });
}

// chamada npm start
exports.default = gulp.series(callJquery,callIMgs,compilarJs,compilarSass,gulp.parallel(myServer,myWatcher))

// chamada npm build
exports.build = gulp.series(callJquery,callIMgs,compilarJs,compilarSass,myStaticServer)
