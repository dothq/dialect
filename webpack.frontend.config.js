const { resolve } = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const frontendConfig = {
    mode: process.env.NODE_ENV,
    entry: "./frontend/index.tsx",
    output: {
        path: resolve(process.cwd(), "dist"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
    },
    module: {
        rules: [
            { 
                test: /\.(tsx|ts)?$/, 
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require("tailwindcss")(resolve(process.cwd(), "tailwind.config.js")),
                                    require("autoprefixer"),
                                ],
                            },
                        },
                    }
                ],
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: "true"
        }),
        new MiniCssExtractPlugin({ 
            filename: "css/application.css" 
        }),
    ]
}

if (process.env.NODE_ENV == "production") {
    // frontendConfig.optimization = {
    //     minimizer: [new TerserWebpackPlugin()],
    // };
} else {
    frontendConfig.devServer = {
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        stats: "errors-only",
        overlay: true,
    };
}

module.exports = frontendConfig;