var path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    fs = require('fs'),
    proxy = require('http-proxy-middleware'),
    Mock = require('mockjs'),
    CWD = process.cwd(),
    wpDevConfig = require('../webpack/dev');

require('shelljs/global');

module.exports = {
    start: function(starr) {
        var config = wpDevConfig(starr);
        app = express(),
            is_start = process.env.MODE == 'start',
            compiler = webpack(config);

        if (is_start) {
            app.use(require('webpack-dev-middleware')(compiler, {
                noInfo: false,
                publicPath: '/',
                stats: {
                    colors: true,
                    cached: false,
                    exclude: [/node_modules[\\\/]/]
                }
            }));

            app.use(require('webpack-dev-middleware')(compiler));
        }

        var mockConfigPath = path.resolve(CWD, 'mock.js');
        if (fs.existsSync(mockConfigPath)) {
            var mock = require(mockConfigPath);
            if (!Array.isArray(mock)) {
                console.error('mock config file must be an Array. \n');
            } else {
                mock.map(function(item) {
                    if (item.proxy) {
                        app.use(proxy(item.path, {
                            target: item.proxy,
                            changeOrigin: item.changeOrigin !== false,
                            ws: item.ws !== false,
                            pathRewrite: item.pathRewrite
                        }));
                    } else {
                        var method = item.method || 'get';
                        app[method](item.path, function(req, res) {
                            var data = Mock.mock(item.data);
                            res.send(data);
                        });
                    }
                });
            }
        }

        app.get(is_start ? '*' : '/', function(req, res) {
            // res.sendFile(path.resolve(CWD, starr.build, 'index.html'));
        });

        if (!is_start) {
            // app.use(express.static(path.resolve(CWD, starr.build)));
        }

        app.listen(starr.port, starr.host, function(err) {
            if (err) {
                console.log(err);
                return;
            }

            console.log('BraveStarr wathes over you at http://', starr.host, starr.port);
            // exec('open http://' + starr.host + ':' + starr.port);
        });
    }
}
