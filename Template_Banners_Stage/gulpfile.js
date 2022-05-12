// Gulp Config
const { src, dest, series, parallel, watch, task } = require('gulp'); // Gulp CLI
const gulpCopy = require('gulp-copy'); // Copy source to new Destination
const all = require('gulp-all');

// BrowserSync
const browserSync = require('browser-sync').create(); // Browser Reloading
const reload = browserSync.reload; // Manual Reload

// CSS/SASS
const autoprefixer = require('gulp-autoprefixer'); // Prefix CSS 
const sass = require('gulp-sass'); // SASS Plugin

// HTML/PUG
const processhtml = require('gulp-processhtml'); // Process/Transform html files
const generateIndex = require('./generate-index'); // Archivo generate-index.js
const pug = require('gulp-pug'); // Compile Pug Template into HTML or JS
const htmlmin = require('gulp-htmlmin'); // Minify HTML

// JS
const uglify = require('gulp-uglify-es').default; // Minufy JS File
const concat = require('gulp-concat'); // Concat Files

// File System
const fs = require('fs'); // File System Variable NodeJS
const path = require('path'); // Path Variable NodeJS

// Valid Errors
const plumber = require('gulp-plumber'); // Prevent pipe breaking caused by errors from gulp plugins

// Sourcemap Debbuging
const sourcemaps = require('gulp-sourcemaps'); // sourcemap embedded in the source file

// Rename Files
const rename = require('gulp-rename'); // Rename Files

// Delete Files
const del = require('del'); // Delete files and directories

// Zip Files
const zip = require('gulp-zip'); // Zip Compress Files

// 
const merge = require('merge-stream');
// Files Paths
const files = {
    DIST_PATH: 'dist',
    SRC_PATH: 'src/banner_list',
    ZIPAll_PATH: 'dist/ZIPS',
    STATIC_PATH: 'src/static'
}
const FOLDERS = getFolders(files.SRC_PATH); // getFolders File system Function

// Get Banner directories for process
function getFolders(dir) {
    return fs.readdirSync(dir).filter( file => {
        return fs.statSync(path.join(dir, file)).isDirectory();
    } );
}

// Static Server
function server(cd) { 
    browserSync.init({
        notify: false, // notificacion en pantalla
        port: 9000,
        reloadDelay: 1000,
        server: {
            baseDir: files.DIST_PATH
        }
    })
    cd();
}

// Delete Dist Folder before build
async function clean() {
    console.log('>>>>>>>>>> STARTING DELETED TASK  ✂️  <<<<');
    return await del.sync( [ files.DIST_PATH ] );
}

// SASS Dashboard
function sassDashboard() {
    console.log('>>>>>>>>>> STARTING DASHBOARD-STYLES TASK 🖌 <<<<');
    return src('./src/_dashboardFiles/dashboard.scss')
        .pipe(plumber( error => {
            console.log('>>>> Dashboard-STYLES TASK ERROR!!! 👎  <<<<');
            console.log(error);
            this.emit('end');
        } ))
        .pipe(sourcemaps.init())
        .pipe(sass( { outputStyle: 'compressed' } ).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(`${files.DIST_PATH}/_dashboardFiles/`))
        .pipe(browserSync.stream());
}

// Generate dynamic index.html for Stage
function processHtml() {
    console.log('>>>>>>>>>> STARTING STAGE TASK  🛣  <<<<');
    return src('src/index.html')
        .pipe(processhtml(
            {
                data: {
                    bannerList: generateIndex()
                }
            }
        ))
        .pipe(dest(`${files.DIST_PATH}/`));
        
}

// Pug For Banners
function pugTask() {
    console.log('>>>>>>>>>> STARTING INDEX TASK  📝  <<<<');
    const pugTemplate = FOLDERS.map( FOLDERS => {
        return src(`${files.SRC_PATH}/${FOLDERS}/pug/*.pug`)
            .pipe(pug({
                pretty: false
            }))
            .pipe(rename("index.html"))
            .pipe(dest(`${files.DIST_PATH}/${FOLDERS}`));
    } );
    return merge(pugTemplate);
}

// SASS For Banners
function sassTask() {
    console.log('>>>>>>>>>> STARTING STYLES TASK 🖌 <<<<');
    const cssTask = FOLDERS.map( FOLDERS => {
        return src([
            `${files.SRC_PATH}/${FOLDERS}/scss/*.scss`, 
            `${files.SRC_PATH}/${FOLDERS}/css/*.css`
                ], { allowEmpty: true })
            .pipe(plumber( error => {
                console.log('>>>> STYLES TASK ERROR!!! 👎  <<<<');
                console.log(error);
                this.emit('end');
            } ))
            .pipe(sourcemaps.init())
            .pipe(sass( { outputStyle: 'compressed' } ))
            .pipe(autoprefixer())
            .pipe(rename("styles.css"))
            // .pipe(sourcemaps.write())
            .pipe(dest(`${files.DIST_PATH}/${FOLDERS}/css`))
            .pipe(browserSync.stream());
    } );
    return merge(cssTask);
}

// Scripts For Banners
function scriptsTask() {
    console.log('>>>>>>>>>> STARTING SCRIPTS TASK  📝   <<<<');
    const jsTask = FOLDERS.map( FOLDERS => {
        return src(`${files.SRC_PATH}/${FOLDERS}/js/*.js`)
            .pipe(plumber( error => {
                console.log('+++++ SCRIPTS TASK ERROR!!!  ❌ +++++');
                console.log(error);
                this.emit('end');
            } ))
            .pipe(sourcemaps.init())
                .pipe(uglify())
                .pipe(concat('main.js'))
            // .pipe(sourcemaps.write())
            .pipe(dest(`${files.DIST_PATH}/${FOLDERS}/js`))
            .pipe(browserSync.stream());
    } );
    return merge(jsTask);
}

// Minify HTML
function minifyTask() {
    console.log('>>>>>>>>>> STARTING MINIFY TASK  💾   <<<<');
    const htmlTask = FOLDERS.map( FOLDERS => {
        return src([
            `${files.SRC_PATH}/${FOLDERS}/*.html`, 
            `${files.SRC_PATH}/${FOLDERS}/*.css` 
        ], { allowEmpty: true })
            .pipe(plumber( error => {
                console.log('+++++ SCRIPTS TASK ERROR!!!  ❌ +++++');
                console.log(err);
                this.emit('end');
            } ))
            .pipe(htmlmin({ collapseWhitespace: true, minifyJS: true, removeComments: true }))
            .pipe(dest(`${files.DIST_PATH}/${FOLDERS}/`))
    } );
    return merge(htmlTask);
}

// Images minify
function imagesTask() {
    console.log('>>>>>>>>>> STARTING IMAGES TASK  🖼  <<<<');
    const imgsTask = FOLDERS.map( FOLDERS => {
        return src([
            `${files.SRC_PATH}/${FOLDERS}/img/*.{png,jpeg,jpg,svg,gif}`, 
            `${files.SRC_PATH}/${FOLDERS}/images/*.{png,jpeg,jpg,gif}`
                ], { allowEmpty: true })
            .pipe(dest(`${files.DIST_PATH}/${FOLDERS}/images`));
    } );
    return merge(imgsTask);
}

// Font copy to new Destinations
function fontsTask() {
    console.log('>>>>>>>>>> STARTING FONTS TASK  🀄️🀄️🀄️  <<<<');
    const fontsTask = FOLDERS.map( FOLDERS => {
        return src(`${files.SRC_PATH}/${FOLDERS}/fonts/*`, { allowEmpty: true })
            .pipe(dest(`${files.DIST_PATH}/${FOLDERS}/fonts/`));
    } );
    return merge(fontsTask);
}

//  External JavaScripts fot 3er party specs
function externalJSTask(cb) {
    console.log('>>>>>>>>>> STARTING External JavaScripts TASK  📜🗞  <<<<');

    const externalJSTask = FOLDERS.map( FOLDERS => {
        return src(`${files.SRC_PATH}/${FOLDERS}/*.js`, { allowEmpty: true })
            .pipe(dest(`${files.DIST_PATH}/${FOLDERS}/`));
    } );
    cb();
}

// Copy files for Dashbaord floder
function copy() {
    console.log('>>>>>>>>>> STARTING COPY Static 📋  <<<<');
    return src([
        'src/static/*',
        'src/_dashboardFiles/fonts/*',
        'src/_dashboardFiles/dashboard.js'
    ])
        .pipe(gulpCopy(`${files.DIST_PATH}/`, {prefix: 1}));
}

// Zip Banner per Folder
function zips() {
    console.log('>>>>>>>>>> STARTING ZIPS TASK  🗜  <<<<');
    const zipTask = FOLDERS.map( FOLDER => {
        return src(`${files.DIST_PATH}/${FOLDER}/**/*`)
            .pipe(zip(`${FOLDER}.zip`))
            .pipe(dest(`${files.DIST_PATH}/ZIPS`));
    } );
    return all(zipTask);
}

// Zip Banner All Folders
function zipsAll() {
    console.log('>>>>>>>>>> STARTING ZIPS ALL BANNERS  🗜 🗜 🗜   <<<<');
    return src([`${files.DIST_PATH}/ZIPS/*.zip`, `${files.DIST_PATH}/static/**`])
        .pipe(zip('all_Set_Banners.zip'))
        .pipe(dest(`${files.DIST_PATH}`));
}

// Watch Task
function watchTask() {
    console.log('>>>>>>>>>> STARTING WATCH TASK 👁  👁   <<<<');
    watch(`${files.SRC_PATH}/**/*.js`, externalJSTask).on('change', reload);
    watch(`${files.SRC_PATH}/**/*.html`, minifyTask).on('change', reload);
    watch(`${files.SRC_PATH}/**/*.css`, minifyTask).on('change', reload);
    watch(`${files.SRC_PATH}/**/pug/*.pug`, pugTask).on('change', reload);
    watch(`${files.SRC_PATH}/**/scss/*.scss`, sassTask).on('change', reload);
    watch(`${files.SRC_PATH}/**/css/*.css`, sassTask).on('change', reload);
    watch(`${files.SRC_PATH}/**/js/*.js`, scriptsTask).on('change', reload);
    watch(`${files.SRC_PATH}/**/img/*.{png,jpeg,jpg,svg,gif}`, imagesTask).on('change', reload);
    watch(`${files.SRC_PATH}/**/images/*.{png,jpeg,jpg,gif}`, imagesTask).on('change', reload);
}

// Export module in order to Run Gulp
exports.build = parallel(pugTask, sassTask, scriptsTask, minifyTask, imagesTask, fontsTask);
exports.distribute = series(clean, this.build, externalJSTask, sassDashboard, copy, zips, processHtml, zipsAll);
exports.default = series(clean, this.build, externalJSTask, sassDashboard,copy,zips,processHtml,server,zipsAll,watchTask)