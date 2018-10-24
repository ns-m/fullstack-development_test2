// basic vars
const path = require('path');
const webpack = require('webpack');

// plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// module settings
module.exports = {
    // base path to the project
    context: path.resolve(__dirname, 'src'),
    //point of entry
    entry: {
        //base
        app: [
            './js/app.js',
            './scss/style.scss'
        ],
    },

    //path for finished files
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: "../"
    },

    //devserver configuration
    devServer: {
        contentBase: './app'
    },

    module: {
        rules: [
            //scss
            {
                // test: /\.scss$/,
                // use: ExtractTextPlugin.extract({
                //     use: [
                //         {
                //             loader: 'css-loader',
                //             options: {sourceMap: true}
                //         },
                //         {
                //             loader: 'sass-loader',
                //             options: {sourceMap: true}
                //         },
                //     ],
                //     fallback: 'style-loader',
                // })
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    // 'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },

    plugins: [
        // new ExtractTextPlugin(
        //     './css/[name].css'
        // ),
        new MiniCssExtractPlugin(
            './css/[name].css'
            // filename: devMode ? './css/[name].css' : '[name].[hash].css',
            // chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        ),
    ],

};