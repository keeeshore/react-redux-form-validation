const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

const mastheadsDir = 'src/mastheads/';
const mastheads = fs.readdirSync(mastheadsDir, {});
const defaultContent = require('./src/common/content.json');
console.log(' mastheadsDir list ::: ', mastheads);
console.log(' defaultContent ::: ', defaultContent);

module.exports = (env) => {
    Object.keys(env).forEach(k => console.log(`:::::::WEBPACK env :::::env.${k}=${env[k]}`));
    const modules = [];
    mastheads.forEach((masthead, indexId) => {
        console.log(`___ Start ${indexId} of masthead: .${masthead}`);
        const entries = {};
        entries[masthead] = `./src/mastheads/${masthead}/index.js`;

        const plugins = [
            new webpack.IgnorePlugin({
                checkResource (resource, context) {
                    if (context.indexOf('config') !== -1 && resource.indexOf(`default.json`) === -1 && resource.indexOf(`${env.STAGE}.json`) === -1) {
                        console.log(`___ resource SKIP this context ____ ${context}:${resource}`);
                        return true;
                    }
                    if (context.indexOf(`mastheads`) !== -1 && resource.indexOf(`${masthead}`) === -1 && resource.indexOf(`content.json`) !== -1) {
                        console.log(`___ resource SKIP this context ____ ${context}:${resource} for ${masthead}`);
                        return true;
                    }
                    return false;
                }
            }),
            new webpack.DefinePlugin({
                'process.env.STAGE': JSON.stringify(env.STAGE),
                'process.env.MASTHEAD': JSON.stringify(masthead)
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            }),
            new HtmlWebpackPlugin({
                template: `./src/mastheads/${masthead}/index.html`,
                filename: `index.html`,
                inject: 'body',
                chunks: [ masthead ]
            }),
            new Dotenv({
                path: `./envs/.env.${env.STAGE}`,
                safe: true,
                allowEmptyValues: true,
                systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
                silent: false, // hide any errors
                defaults: false // load '.env.defaults' as the default values if empty.
            })
        ];

        // if (env.STAGE !== 'local') {
        //    plugins.unshift(new CleanWebpackPlugin());
        // }

        const config = {
            name: masthead,
            entry: entries,
            output: {
                path: path.resolve(__dirname, `dist/${masthead}/`),
                filename: `[name].bundle.js`,
                chunkFilename: '[id].js',
                publicPath: `./`
            },
            resolve: {
                extensions: ['.js', '.jsx', '.scss']
            },
            optimization: {
                minimize: false,
                minimizer: [
                    new TerserPlugin({
                        terserOptions: {
                            ecma: undefined,
                            parse: {},
                            compress: {
                                collapse_vars: false,
                                keep_classnames: true,
                            },
                            mangle: false, // Note `mangle.properties` is `false` by default.
                            module: false,
                            output: null,
                            toplevel: false,
                            nameCache: null,
                            ie8: false,
                            keep_classnames: true,
                            keep_fnames: true,
                            safari10: false,
                        },
                    }),
                ]
            },
            module: {
                noParse: /config\/local\.json/,
                rules: [
                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/
                    },
                    {
                        test: /\.s[ac]ss$/i,
                        use: [
                            { loader: 'style-loader' },

                            {
                                loader: 'css-loader',
                                options: {
                                    modules: {
                                        localIdentName: "[local]",
                                    },
                                    sourceMap: true
                                }
                            },

                            { loader: 'sass-loader' },

                            {
                                loader: 'postcss-loader',
                                options: {
                                    postcssOptions: {
                                        plugins: [
                                            [ 'autoprefixer', {}, ],
                                        ],
                                    },
                                }
                            },
                        ],

                    },
                    {
                        test: /\.(png|jpe?g|gif|svg)$/,
                        loader: 'url-loader?limit=10000&name=img/[name].[ext]'
                    },
                ]
            },
            plugins: plugins,
            devServer: {
                contentBase: path.join(__dirname, `dist/`),
                compress: false,
                port: 9000
            }
        };
        console.log(` config = `, config, ' \n______________');
        modules.push(config);
    });


    return modules;
};
