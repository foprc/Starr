let program = require('commander'),
    path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    fs = require('fs'),
    os = require('os'),
    CWD = process.cwd(),
    WPDEV = require('../webpack/dev');

require('shelljs/global');

function start(starr){
    let app = express(),
        isDev = process.env.MODE === 'dev'
        config = WPDEV(starr);
        // compiler = webpack(config)
        //
        console.log(config);
        //setup express
        if (isDev) {
            // app.use();

        }


}

module.exports = {
    start
}
