const { resolve } = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

const serverConfig = {
    mode: process.env.NODE_ENV,
    entry: "./server/index.tsx",
    target: "node",
    externals: [nodeExternals()],
    output: {
        path: resolve(process.cwd(), "dist"),
        filename: "server.js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
      rules: [
        { 
            test: /\.(ts|tsx)$/, 
            use: "ts-loader" 
        }
      ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: "false"
        }),
    ]
}

module.exports = serverConfig;