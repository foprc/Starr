var path = require('path'),
    fs = require('fs'),
    CWD = process.cwd(),
    utils = require('../utils/utils')

var default_starr = require('./starr.config');

function _getStarr(){
    if (utils.isExists('starr.config.js')) {
        var config = path.resolve(CWD, 'starr.config.js');
        var starr = require(config);

        return utils.extendConfig(default_starr, starr);
    }

    return default_starr;
}

function _hasStarr(){
    return utils.isExists('starr.config.js');
}

module.exports = {
    getStarr: _getStarr,
    hasStarr: _hasStarr
}
