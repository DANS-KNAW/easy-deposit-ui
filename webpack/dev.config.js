/*
 * Copyright (C) 2018 DANS - Data Archiving and Networked Services (info@dans.knaw.nl)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(baseConfig, {
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'eval-source-map',
    output: {
        publicPath: "/"
    },

    // TODO devServer with proxies
    // https://github.com/Dans-labs/dariah/blob/master/client/webpack.dev.js#L63-L73
    devServer: {
        inline: true,
        host: '000.000.00.00',
        port: 3000,
        hot: true,
        historyApiFallback: true
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'css-hot-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true},
                    },
                    {
                        loader: 'postcss-loader',
                        options: {config: {path: 'webpack/postcss.config.js'}},
                    },
                ],
            },
        ],
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
    ],
});
