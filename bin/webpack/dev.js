let webpack = require('webpack');

let webpackConfig = function(config){

    let _config = {
        devtool: config.devtool,

        debug: true
    }

    return _config;
}

module.exports = webpackConfig;
