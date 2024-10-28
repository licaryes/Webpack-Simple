const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports =()=> ({
    entry: "./src/js/index.js",
    output: {
        filename: `main.[fullhash].js`,
        publicPath: "/",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: ['style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                quietDeps: true,  // Отключить предупреждения от зависимостей
                            }
                        }
                    }],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|tff)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env',{targets:"defaults"}]]
                    }
                }
            },
        ],
    },
    plugins: [

        new HtmlWebpackPlugin({
        template: './src/index.html',
    }),
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminGenerate,
                options: {
                    plugins: [
                        ['mozjpeg', { quality: 75 }],
                        ['pngquant', { quality: [0.65, 0.9], speed: 4 }],
                        ['svgo', {}],
                        ['gifsicle', { optimizationLevel: 2 }]
                    ],
                },
            },
        })
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
    }

})