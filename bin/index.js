#!/usr/bin/env node
// ↑↑ make OS know that this program can run by node.js

// This is the entry js file

let program = require('commander'),
    path = require('path'),
    fs = require('fs'),
    cli = require('./utils/cli'),
    packages = require('../package.json'),
    jobs = require('./utils/jobs'),
    starr = require('./utils/config'),
    CWD = process.cwd();

let __mode;

require('shelljs/global');

config = starr.getInstance();

program
    .version(packages.version)
    .option('-p, --port', 'custom server port', config.port)
    // .option('-s, --server', 'run static server', true)
    // .option('-w, --watch', 'run watch mode', true)
    .arguments('[mode] [name]')
    .action((mode, name)=>{
        __mode = mode;

        // test whether the porject is initialized
        // if (!starr.hasStarrConfig() && mode !=='init'){
        //     console.log('no config file \n');
        //     process.exit(1);
        // }

        let modes = ['dev'];
        if (modes.indexOf(mode) === -1) {
            console.log('no task found \n');
            cli.help();
        } else {
            rm('-rf', path.resolve(CWD, config.build));
            jobs[mode](name || program.port);
        }
    });

program.parse(process.argv);

if (!__mode) {
    cli.help();
}
