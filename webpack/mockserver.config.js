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
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const rootPath = process.cwd();
const buildPath = 'target/build-mockserver';

module.exports = {
    entry: './src/test/typescript/mockserver/server.ts',
    output: {
        path: path.join(rootPath, buildPath),
        filename: 'server.js'
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx'],
        modules: [
            './src/main/typescript',
            './src/test/typescript',
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
                    presets: ['es2015'],
                    plugins: ['transform-class-properties', 'transform-object-rest-spread'],
                },
            }
        ],
    },

    target: 'node',

    externals: [nodeExternals()],

    plugins: [
        // Clear out `target/build` directory between builds
        new CleanWebpackPlugin(),
    ],
};
