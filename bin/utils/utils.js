let path = require('path'),
    fs = require('fs'),
    CWD = process.cwd();

require('shelljs/global');

function isFileExists(filename) {
    return fs.existsSync(path.resolve(CWD, filename));
}

function checkNodeModule(){
    if (!fs.existsSync(path.resolve(CWD, 'node_modules'))) {
        console.log('install node modules ... \n');
        exec('yarn install');
    }
}

module.exports = {
    isFileExists,
    checkNodeModule
}
