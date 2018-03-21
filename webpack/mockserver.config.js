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
const fs = require('fs');
const nodeModules = fs.readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .map(mod => ({ [mod]: `commonjs ${mod}` }))
    .reduce((prev, curr) => ({...prev, ...curr}), {});

module.exports = {
    entry: './src/test/typescript/mockserver/server.ts',
    output: {
        filename: './target/build-mockserver/server.js'
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
    externals: nodeModules
};
