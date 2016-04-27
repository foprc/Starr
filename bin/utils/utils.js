var path = require('path'),
    fs = require('fs'),
    CWD = process.cwd();

require('shelljs/global');

function _isExists(filename) {
    return fs.existsSync(path.resolve(CWD, filename));
}

function _extend(target, source) {
    var hasOwnProperty = {}.hasOwnProperty;

    for(var key in source) {
        if(hasOwnProperty.call(target, key)) {
            if(key === 'alias' || key === 'template') {
                // for alias, rewrite already defined, and add in new
                for(var al in source[key]) {
                    target[key][al] = source[key][al];
                }
            } else {
                target[key] = source[key];
            }
        }
    }

    if(source['template']) {
        // set template path
        target.template.path = source.template.path ? path.resolve(CWD, target.template.path) : path.resolve(__dirname, '..', 'template', 'template.html');

        // set template favicon
        source.template.favicon && (target.template.favicon = path.resolve(CWD, source.base, source.template.favicon));
    }

    // rewrite with local absolute path
    for(var key in target.alias) {
        var value = target.alias[key];
        target.alias[key] = path.join(target.base, value);
    }

    return target;
}

function _check_modules() {
    if (!fs.existsSync(path.resolve(CWD, 'node_modules'))) {
        console.log('install node modules ... \n');
        exec('npm install');
    }
}

module.exports = {
    isExists: _isExists,
    extendConfig: _extend,
    check_modules: _check_modules
}
