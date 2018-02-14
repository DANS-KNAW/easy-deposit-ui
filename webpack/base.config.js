const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        './src/main/typescript/client.tsx',
    ],

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
        modules: [
            './src/main/typescript',
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
        // insert the bundled JavaScript into this file
        new HtmlWebpackPlugin({
            template: './src/main/html/index.html',
        }),
        // Extract imported CSS into own file
        new ExtractTextPlugin('[name].bundle.[chunkhash].css'),
    ],
};
