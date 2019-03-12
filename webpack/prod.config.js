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
const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./base.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => merge(baseConfig(env, argv), {
    output: {
        path: path.join(process.cwd(), 'target/build'),
        filename: '[name].bundle.[chunkhash].js',
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
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
        ]
    },

    plugins: [
        // Clear out `target/build` directory between builds
        new CleanWebpackPlugin(),
        // Minify CSS
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
    ],

    optimization: {
        minimizer: [
            // Minify JS
            new TerserPlugin({
                test: /\.[j|t]sx?($|\?)/i,
                sourceMap: true,
                parallel: true,
                terserOptions: {
                    ecma: 6,
                    compress: true,
                    mangle: true,
                },
                extractComments: true,
            })
        ],
        splitChunks: {
            chunks: 'all',
            name: 'vendor',
        },
    },
});
