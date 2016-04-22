#!/usr/bin/env node

var StarrApp = require('commander'),
    path = require('path'),
    fs = require('fs'),
    starr = require('./starr/config'),
    packages = require('../package.json'),
    utils = require('./utils/utils'),
    task = require('./task'),
    cli = require('./utils/cli'),
    CWD = process.cwd();

var _param;

require('shelljs/global');

StarrApp.version(packages.version)
    .option('-p, --port', 'custom server port', config.port)
    .arguments('[param] [name]')
    .action(function(param, name) {
        var config = starr.getStarr();
        _param = param;

        // if (!starr.hasStarr() && param !== 'init') {
        //     console.log('Starr can not find object!');
        //     process.exit(1);
        // }

        var params = [
            'init',
            'start'
        ];

        if (params.indexOf(param) === -1) {
            console.log('Starr does not konw TuT...');
        } else {
            // clean last build
            // rm('-rf', path.resolve(CWD, config.build));
            console.log('Starr is running.');
            task[param](name || StarrApp.port || StarrApp.server);
        }
    });

StarrApp.parse(process.argv);

if (!_param) {
    cli.help();
}
