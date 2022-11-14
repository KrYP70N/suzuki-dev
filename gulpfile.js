const { series, parallel, src, dest, task, watch } = require('gulp'),
  ts = require('gulp-typescript'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass')(require('sass')),
  clean = require('gulp-clean'),
  // babel = require('gulp-babel'),
  server = require('gulp-connect');


const tsProject = ts.createProject('tsconfig.json')

const tscript = async () => {
  return tsProject.src()
    .pipe(tsProject())
    // .pipe(babel({
    //   presets: ['@babel/env']
    // }))
    .pipe(dest('dist/js'))
    .pipe(server.reload())
}

const libScript = async () => {
  return src('./src/script/js/**.js')
    // .pipe(babel({
    //   presets: ['@babel/env']
    // }))
    .pipe(dest('dist/js'))
    .pipe(server.reload())
}

const template = async () => {
  return src('./src/template/**.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest('dist'))
    .pipe(server.reload())
}

const style = async () => {
  return src('./src/scss/**.scss')
    .pipe(sass())
    .pipe(dest('dist/css'))
    .pipe(server.reload())
}

const assets = async () => {
  return src('./src/assets/**/**.**')
    .pipe(dest('dist/assets'))
    .pipe(server.reload())
}

const runDev = async () => {
  watch('./src/script/ts/**/**.ts', tscript)
  watch('./src/script/js/**/**.js', libScript)
  watch('./src/template/**/**.pug', template)
  watch('./src/scss/**/**.scss', style)
  watch('./src/assets/**/**.**', assets)
}

const clear = async () => {
  return src('dist')
    .pipe(clean())
}

const liveserver = () => {
  server.server({
    root: 'dist',
    livereload: true
  })
}

const modulesJS = async () => {
  return src([
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/slick-carousel/slick/slick.min.js',
    './node_modules/animejs/lib/anime.min.js'])
    .pipe(dest('dist/js'))
    .pipe(server.reload())
}

const moduleCSS = async () => {
  return src(['./node_modules/slick-carousel/slick/slick.css'])
    .pipe(dest('dist/css'))
    .pipe(server.reload())
}

const moduleFont = async () => {
  return src(['./src/assets/font/**.**'])
    .pipe(dest('dist/assets/font'))
    .pipe(server.reload())
}


const build = parallel(modulesJS, moduleCSS, moduleFont, tscript, libScript, template, style, assets)

exports.clear = clear
exports.build = series(build)
exports.default = series(build, runDev, liveserver)