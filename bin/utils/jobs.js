#!/usr/bin/env node

let program = require('commander'),
    path = require('path'),
    fs = require('fs'),
    webpack = require('webpack'),

    config = require('./config')
    starr = config.getInstance(),
    watch = require('watch'),
    Utils = require('./utils'),
    server = require('./server'),

    CWD = process.cwd();

require('shelljs/global');

function dev(){
    console.log('dev mode start');
    Utils.checkNodeModule();
    process.env.MODE = 'dev';
    server.start(starr);
}

module.exports = {
    dev
}
