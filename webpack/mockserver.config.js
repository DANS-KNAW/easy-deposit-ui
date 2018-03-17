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
