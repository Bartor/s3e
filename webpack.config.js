const path = require('path');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: './src/index.ts',
    module: {
        rules: [{
            test: /\.ts$/,
            loader: "ts-loader"
        }]
    },
    resolve: {
        extensions: [".ts"],
    },
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, 'dist'),
    },
};