const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat')
const server = require('gulp-webserver');

const myServer = () => {
    gulp.src('./')	// <-- your app folder
    .pipe(server({
      livereload: true,
      open: true,
      port: 8080	// set a port to avoid conflicts with other local apps
    }));
}


//funcao para compilar o JS
const compilarJs = () => {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(concat('codigo.min.js'))
        .pipe(gulp.dest('dist/js'))
}

//funcao para compilar o SASS
const compilarSass = () => {
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
const callJquery = () => {
    return gulp.src('node_modules/**/jquery.min.js')
        .pipe(gulp.dest('dist/js'))        
}

// junta as funcoes de compilar o JS e o Sass
const allFuncs = () => {
    compilarJs();
    compilarSass();
}

// observa se tem mudança no arquivo e atualiza
const myWatch = () => {    
    gulp.watch('./src/**/*.*', () => {
        allFuncs();
        myWatch();
    });
}

exports.default = async () => {
    callJquery();
    allFuncs();
    myServer();
    myWatch();    
}

exports.build = async () => {
    callJquery();
    allFuncs();
}