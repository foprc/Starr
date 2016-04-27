var webpack = require('webpack'),
    TransferWebpackPlugin = require('transfer-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path'),
    CWD = process.cwd();

require("babel-polyfill");

var webpackConfig = function(config){

    var _config = {

        devtool: config.devtool,

        debug: true,

        entry: (function(){
            if (typeof config.pages == 'object') {
                var entries = {
                    'vendor': config.vendor || ['react', 'react-dom']
                };

                for (var entry in config.pages) {
                    entries[entry] = [
                        require.resolve('webpack-hot-middleware/client'),
                        path.resolve(CWD, config.pages[entry])
                    ]
                }
                return entries;
            }

            return {
                'shared': [
                    require.resolve('webpack-hot-middleware/client'),
                    path.resolve(CWD, config.base, config.pages)
                ],
                'vendor': config.vendor || ['react', 'react-dom']
            }
        })(),

        output: {
            path: path.resolve(CWD, config.build),
            chunkFilename: 'js/[name]-[chunkhash:8].js',
            filename: 'js/[name].js'
        },

        module: {
            preLoaders: config.eslint ? [{
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                include: [path.resolve(CWD, config.base)],
                exclude: /node_modules/
            }] : [],
            loaders: [{
                test: /\.jsx?$/, // .jsx or .js files
                loader: 'babel',
                exclude: [path.resolve(CWD, 'node_modules')],
                query: {
                    stage: 0,
                    env: {
                        development: {
                            plugins: [require.resolve('babel-plugin-react-transform')],
                            extra: {
                                'react-transform': [{
                                    target: require.resolve('react-transform-hmr'),
                                    imports: ['react'],
                                    locals: ['module']
                                }]
                            }
                        }
                    }
                }
            }, {
                test: /\.css$/,
                include: [path.resolve(CWD, config.base, config.scss)],// extract style import from scss to separate css files
                loader: 'style!css!autoprefixer'
            }, {
                test: /\.less$/,
                include: [path.resolve(CWD, config.base, config.scss)],
                loader: 'style!css!autoprefixer!less?sourceMap'
            }, {
                test: /\.scss$/,
                include: [path.resolve(CWD, config.base, config.scss)],// extract style import from scss to separate css files
                loader: 'style!css!autoprefixer!sass?sourceMap&includePaths[]=' + path.resolve(CWD, 'node_modules') +
                    '&includePaths[]=' + path.resolve(CWD, 'node_modules') +
                    '&includePaths[]=' + path.resolve(CWD, config.base)
            }, {
                test: /\.css$/,
                exclude: [path.resolve(CWD, config.base, config.scss)],
                loader: 'style!css' + (config.css_modules ? '?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:8]' : '') + '!autoprefixer'
            }, {
                test: /\.less$/,
                exclude: [path.resolve(CWD, config.base, config.scss)],
                loader: 'style!css' + (config.css_modules ? '?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:8]' : '') + '!autoprefixer!less?sourceMap'
            }, {
                test: /\.scss$/,
                exclude: [path.resolve(CWD, config.base, config.scss)],// pack other styles into JS and wrapped within style at runtime
                loader: 'style!css' + (config.css_modules ? '?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:8]': '') + '!autoprefixer!sass?sourceMap' +
                    '&includePaths[]=' + path.resolve(CWD, 'node_modules') +
                    '&includePaths[]=' + path.resolve(CWD, config.base)
            }, {
                test: /\.(png|jpg|gif|jpeg)$/,
                // < 20k, otherwise file-loader is used auto
                loader: 'url?limit=' + config.base64_image_limit + '&name=' + config.assets + '/images/[name]-[hash:8].[ext]'//20k
            }, {
                test: /\.(ttf|eot|svg|woff[1-9]?)$/,
                loader: "file?name=" + config.assets + "/fonts/[name]-[hash:8].[ext]"
            }, {
                test: /\.json$/,
                loader: "json"
            }]
        },

        resolveLoader: {
            root: path.join(__dirname, '..', '..',  'node_modules'),
            fallback: [path.resolve(CWD, 'node_modules')]
        },

        resolve: {
            root: CWD,
            alias: config.alias,
            modulesDirectories: ["web_modules", "node_modules", 'bower_components'],
            extensions: ['', '.js', '.json', '.jsx', '.scss', '.css', '.less'],
            fallback: [path.resolve(__dirname, '..', '..', 'node_modules')]
        },

        plugins: [
            // new webpack.optimize.OccurenceOrderPlugin(true),
            // new webpack.optimize.DedupePlugin(),
            // new webpack.optimize.AggressiveMergingPlugin(),
            // new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 20000 }),// min 20k
            //Enables Hot Modules Replacement
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new webpack.DefinePlugin((function(){
                var global_defines =  {
                     'process.env': {
                         MODE: JSON.stringify(process.env.MODE),
                         NODE_ENV: JSON.stringify('development')
                     },
                     'API': JSON.stringify(config.api[process.env.MODE]),
                     'STATIC': JSON.stringify(config.static[process.env.MODE])
                };

                for(var global in config.globals) {
                     global_defines[global.toUpperCase()] = JSON.stringify(config.globals[global][process.env.MODE])
                }

                return global_defines;
            })()),
            // Split vendors
            new webpack.optimize.CommonsChunkPlugin("vendor", "js/vendor.bundle.js"),
            // common module extract
            new webpack.optimize.CommonsChunkPlugin({
                filename: "js/commons.bundle.js",
                minChunks: 3, // shared within at least 3 modules
                minSize: 10 * 1000, // 10k
                children: true // include all chunks
            }),
            // style extract as specified
            // new ExtractTextPlugin('css/[name]-[contenthash:8].css'),
            // Global modules
            // http://webpack.github.io/docs/shimming-modules.html
            new webpack.ProvidePlugin({
                React: 'react'
            }),
            new TransferWebpackPlugin(config.transfer_assets ? [{
                from: path.join(config.base, config.assets || 'assets'),
                to: path.join(config.assets || 'assets')
            }] : [], path.resolve(CWD))
        ],
        //eslint config options. Part of the eslint-loader package
        eslint: {
            configFile: path.resolve(CWD, '.eslintrc')
        }
    }

    //Generate HTML
    if(typeof config.pages == 'object') {
        // multi-entry config
        for(var entry in config.pages) {
            _config.plugins.push(new HtmlWebpackPlugin({
                chunks: [entry, 'vendor'],
                filename: entry + '.html',
                title: config.template.title,
                keywords: config.template.keywords,
                description: config.template.description,
                viewport: config.template.viewport,
                template: config.template.path,
                favicon: config.template.favicon
            }))
        }

    } else {
        _config.plugins.push(new HtmlWebpackPlugin({
            chunks: ['shared', 'vendor'],
            filename: 'index.html',
            title: config.template.title,
            keywords: config.template.keywords,
            description: config.template.description,
            viewport: config.template.viewport,
            template: config.template.path,
            favicon: config.template.favicon
        }))
    }

    return _config;
}

module.exports = webpackConfig;
