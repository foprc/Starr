let _ = require('lodash'),
    path = require('path'),
    fs = require('fs'),
    CWD = process.cwd(),
    Utils = require('./utils'),
    default_starr = require('./starr.config.js');

module.exports = {
    getInstance: function() {
        if (Utils.isFileExists('starr.config.js')) {
            let filepath = path.resolve(CWD, 'starr.config.js');
            let starr = require(filepath);
            return _.assign(default_starr, starr);
        }

        return  default_starr;
    },
    hasStarrConfig: function() {
        return Utils.isFileExists('starr.config.js');
    }
}
