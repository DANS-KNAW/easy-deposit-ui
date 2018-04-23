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
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config.json');
const dateFormat = require('dateformat');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        './src/main/typescript/client.tsx',
    ],

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
        modules: [
            './src/main/typescript',
            './src/main/resources',
            'node_modules',
        ]
    },

    module: {
        rules: [
            {
                test: /\.[j|t]sx?$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['transform-class-properties', 'transform-object-rest-spread', 'react-hot-loader/webpack'],
                },
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'app/images/[name].[ext]',
                        }
                    },
                ],
            },
        ],
    },

    plugins: [
        new webpack.EnvironmentPlugin([
            'NODE_ENV',
        ]),
        new webpack.DefinePlugin({
            __CLIENT_ROUTE__: JSON.stringify(config[process.env.NODE_ENV].clientRoute),
            __VERSION__: JSON.stringify(process.env.npm_package_version),
            __BUILD_DATE__: JSON.stringify(dateFormat(new Date(), "yyyy-mm-dd HH:MM")),
        }),
        // insert the bundled JavaScript into this file
        new HtmlWebpackPlugin({
            template: './src/main/html/index.html',
        }),
        // Extract imported CSS into own file
        new ExtractTextPlugin('[name].bundle.[chunkhash].css'),
    ],
};
