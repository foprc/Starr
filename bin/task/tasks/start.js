#!/usr/bin/env node

var Utils = require('../../utils/utils'),
    config = require('../../starr/config'),
    starr = config.getStarr(),
    server = require('../../utils/server');

require('shelljs/global');

module.exports = function(port){
    Utils.check_modules();
    process.env.MODE = 'start';
    starr.port = port || starr.port;
    server.start(starr);
}
