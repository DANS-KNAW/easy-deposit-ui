const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(baseConfig, {
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'eval-source-map',

    // TODO devServer with proxies
    // https://github.com/Dans-labs/dariah/blob/master/client/webpack.dev.js#L63-L73
    devServer: {
        inline: true,
        port: 8080,
        hot: true,
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {sourceMap: true},
                        },
                        {
                            loader: 'postcss-loader',
                            options: {config: {path: 'webpack/postcss.config.js'}},
                        },
                    ]
                }),
            },
        ],
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
    ],
});
