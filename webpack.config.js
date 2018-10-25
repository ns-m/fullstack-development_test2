// basic vars
const path = require('path');
const webpack = require('webpack');

// plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

let isProduction = (process.env.NODE_ENV === 'production');

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
        contentBase: './app',
        historyApiFallback:{
            index:'./app/index.html'
        },
    },

    devtool: (isProduction) ? '' : 'inline-source-map',

    module: {
        rules: [
            //scss
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {sourceMap: true}
                        },
                        {
                            loader: 'postcss-loader',
                            options: {sourceMap: true}
                        },
                        {
                            loader: 'sass-loader',
                            options: {sourceMap: true}
                        },
                    ],
                    fallback: 'style-loader',
                }),
            },

            //image
            {
                test: /\.{png|gif|cur|jpe?g}$/,
                loaders: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                    'img-loader',
                ]
            },

            //fonts
            {
                test: /\.{woff|woff2|eot|ttf|otf}$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[path][name].[ext]',
                        }
                    }
                ]
            },

            //svg
            {
                test: /\.svg$/,
                loader: "svg-url-loader",
            },
        ],
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            Popper: ['popper.js', 'default'],
        }),
        new ExtractTextPlugin(
            './css/[name].css'
        ),
        new CleanWebpackPlugin('dist'),
        new CopyWebpackPlugin(
            [
                {from: './img', to: 'img'}
            ],
            {
                ignore: [
                    {glob: 'svg/*'},
                ]
            }
        )
    ],
};

//production only
if (isProduction){
    module.exports.plugins.push(
        new UglifyjsWebpackPlugin({
            sourceMap: true
        }),
    );
    module.exports.plugins.push(
        new ImageminWebpackPlugin({
            test: /\.{png|gif|jpe?g|svg}$/
        }),
    );
    module.exports.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
    );
}