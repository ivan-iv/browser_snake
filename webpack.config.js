module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.json']
    },

    module: {
        rules: [
            {test: /\.ts$/, loader: 'awesome-typescript-loader'}
        ]
    }
};
