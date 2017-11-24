const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const environment = process.env.NODE_ENV || 'DEV';

const config = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015', 'stage-2']
                    }
                }]
            },
            // [\\\/] - as the "/" delimiter to make the RegExp work in Unix and Windows
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader?sourceMap',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers: ['last 2 versions', 'ie 8', 'ie 9', 'iOS 7', 'android 3', 'android 4']
                                })
                            ]
                        }
                    }
                ]
            }
        ]
    },
    node: {
        fs: "empty"
    },
    resolve: {
      modules: [
          path.resolve('.'),
          'node_modules'
      ]
    }
};

if (environment === 'DEV') {
    Object.assign(config, {
        devtool: 'source-map',
        entry: [
            'webpack-dev-server/client?http://localhost:5050',
            'app.js'
        ],
        output: {
            publicPath: 'http://localhost:5050/',
            filename: 'bundle.js'
        },
        devServer: {
            stats: {
                warnings: false
            }
        }
    });
}

if (environment === 'PROD') {
    Object.assign(config, {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: true,
                sourceMap: true
            })
        ],
        entry: [
            './app.js'
        ],
        output: {
            path: __dirname + '/build',
            filename: 'bundle.js'
        }
    });
}

module.exports = config;
