const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const config = require('./config');

let sass_files = [
    './src/sass/alert.scss',
];

let less_files = [
    './src/less/alert.less',
];

let files = [];
if(config.sass === true) {
    files = files.concat(sass_files);
} else if(config.less === true) {
    files = files.concat(less_files);
}
files.push("./src/js/index.js");

module.exports = {
    mode: 'development',
    entry: files,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/index.js',
    },
    module: {
        rules: [
            {
                test: /\.(html|html)$/,
                loader: "html-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         name: 'css/[name].css',
                    //     }
                    // },
                    // {
                    //     loader: 'extract-loader'
                    // },
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader?-url',
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            // sassOptions: {
                            //     outputStyle: "compressed",
                            // },

                        }
                    },
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         name: 'css/[name].css',
                    //     }
                    // },
                    // {
                    //     loader: 'extract-loader'
                    // },
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader?-url',
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                            // sassOptions: {
                            //     outputStyle: "compressed",
                            // },

                        }
                    },
                ]
            },
            {
                test: /\.css/,
                use: ["css-loader", "style-loader"]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new WebpackBuildNotifierPlugin({
            title: "Amir Developer",
            showDuration: true,
            onCompileStart: true,
            // suppressSuccess: true, // don't spam success notifications
        }),
    ],
    devServer: {
        port: 9000,
        open: true,
    }
};