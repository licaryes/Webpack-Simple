const HtmlWebpackPlugin = require("html-webpack-plugin");

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
        ],
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html',
    })],

})