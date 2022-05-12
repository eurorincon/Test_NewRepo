// Module
const pkg = require('./package.json'); // Archivo Package.json
const fs = require('fs'); // File System Variable NodeJS
const path = require('path'); // Path Variable NodeJS
const fileBytes = require('file-bytes'); // Plugin to know size of files
const prettyBytes = require('pretty-bytes'); // Plugin to Format FileBytes
const glob = require('glob'); // Gulp Variable

module.exports = function() {
    const Header = `<div class="innerBox"><h3 class="banner-name">${pkg.client}</h3>`;
    const Subheader = `<h2 class="banner-client">${pkg.title}</h2><div></header>`;
    let table = '<section class="container" id="container"><ul class="download-items list-group grid">';
    const li = '<li class="contAd">';
    const ENDli = '</li>';
    const folder_path = {
        SRC_PATH: 'src/banner_list',
        SRC_PATH_ZIP: 'dist/ZIPS/*',
        STATIC_PATH: 'src/static/*'
    };
    const FOLDERS = getFolders(folder_path.SRC_PATH);

    function getFolders(dir) {
        return fs.readdirSync(dir).filter(() => {
            return fs.statSync(path.join(dir)).isDirectory();
        });
    }

    let files = glob.sync(folder_path.SRC_PATH_ZIP);
    let statics = glob.sync(folder_path.STATIC_PATH);

    for (let FOLDER of FOLDERS) {
        if (FOLDER !== '.DS_Store') {
            const folderName = FOLDER.replace(/_/g, ' ');
            let links = '';
            let classes, size;
            table += li;
            links += `<div class="contAd-header">`;
            links += `<div class="titleBanner" title="${folderName} - Banner HTML"><a data-fancybox="titleGal" data-type="iframe" data-caption="${folderName} - Banner HTML" href="${FOLDER}/index.html">${folderName}</a></div>`;
            links += `<div class="linea"></div>`;
            links += `<div id="btnBox" class="btnBox">`;
            // links += `<a class="btn_bkup" data-fancybox="gallery" data-caption="${folderName} - Backup Image" title="${folderName} - Backup Image" href="static/${FOLDER}.jpg"><i class="icon-clipimg"></i></a>`;
            links += `<a class="btn_zip" title="${folderName} - Zip File" href="ZIPS/${FOLDER}.zip"><i class="icon-dwn"></i></a>`;
            links += `<a class="btn_link" title="Open New Tab" href="${FOLDER}/index.html" target="_blank"><i class="icon-nw_tb"></i></a>`;
            links += `</div>`;
            links += `<div class="linea"></div>`;
            links += `</div>`;
            links += `<a data-fancybox="gallery" data-type="iframe" class="btn_thmb" data-caption="${folderName} - Banner HTML" title="${folderName} - Banner HTML" href="${FOLDER}/index.html"><div class="thumb" style="background-image: url(static/${FOLDER}.jpg);"></div></a>`;
            links += `<div id="kb_Box" class="kbBox">`;
            statics.map(static => {
                if (static.match(FOLDER)) {
                    console.log(FOLDER);
                    size = prettyBytes(fileBytes.sync(static));
                    if (parseInt(size) > pkg.img_kb) {
                        classes = 'danger';
                    } else {
                        classes = 'success';
                    }
                }
            });
            links += `<span id="img_kb" class="${classes}">${size}</span>`;
            links += `<div class="linea"></div>`;
            files.map(file => {
                if (file.match(FOLDER)) {
                    size = prettyBytes(fileBytes.sync(file));
                    if (parseInt(size) > pkg.zip_kb) {
                        classes = 'danger';
                    } else {
                        classes = 'success';
                    }
                }
            });
            links += `<span id="zip_kb" class="${classes}">${size}</span></div>`;
            
            links += `<div id="btnBoxMobile" class="btnBoxMobile">`;
            links += `<a class="btn_zip" title="${folderName} - Zip File" href="ZIPS/${FOLDER}.zip"><i class="icon-dwn"></i></a>`;
            links += `<div class="linea"></div>`;
            links += `<a class="btn_link" title="Open New Tab" href="${FOLDER}/index.html" target="_blank"><i class="icon-nw_tb"></i></a>`;
            links += `</div>`;

            table += links;
            table += ENDli;
        }
    }
    table += '</ul></section>';
    html = Header + Subheader + table;
    return html;
};
