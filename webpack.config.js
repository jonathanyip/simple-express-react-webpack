/*
 * webpack.config.js
 * Contains settings for webpack staticfile compilation
 */

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const resolve = path.resolve.bind(path, __dirname);

module.exports = env => {
    /*
    * Website Settings
    */

    // Files that should be compiled by webpack
    const files = {
        app: resolve("./src/frontend/app.jsx")
    };

    /*
    * Webpack settings
    */
    var config = {
        context: __dirname,
        entry: files,
        externals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
                {
                    test: /\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                sourceMap: true,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: () => [autoprefixer()],
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: "[name].[ext]",
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            modules: [
                "node_modules",
                resolve("./src/frontend"),
                resolve("./src/api")
            ],
            extensions: ['.js', '.jsx']
        }
    };

    // Do different things depending on whether this is production
    if(env.NODE_ENV === 'production') {
        config = Object.assign({
            mode: 'production',

            output: {
                path: resolve("./build/prod/frontend"),
                filename: "[name].[chunkhash].js"
            },

            plugins: [
                new MiniCssExtractPlugin({
                    filename: "[name].[contenthash].css",
                }),
                new HtmlWebpackPlugin({
                    title: "App",
                    minify: true,
                    template: "src/frontend/index.html",
                    NODE_ENV: env.NODE_ENV,
                }),
            ],

            optimization: {
                minimizer: [
                    new UglifyJsPlugin({
                        cache: true,
                        parallel: true,
                    }),
                    new OptimizeCSSAssetsPlugin({
                        cssProcessor: cssnano,
                        ssProcessorOptions: { discardComments: { removeAll: true } },
                        safe: true,
                        canPrint: true,
                    }),
                ],
            },
        }, config);
    } else {
        config = Object.assign({
            mode: 'development',
            devtool: 'source-map',

            output: {
                path: resolve("./build/dev/frontend"),
                filename: "[name].js"
            },

            plugins: [
                new MiniCssExtractPlugin({
                    filename: "[name].css",
                }),
                new HtmlWebpackPlugin({
                    title: "App",
                    minify: false,
                    template: "src/frontend/index.html",
                    NODE_ENV: env.NODE_ENV,
                }),
            ]
        }, config);
    }

    return config;
}
