const webpack = require('webpack');

module.exports = {
  entry: './src/index',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-1'],
        },
      },
    ],
  },
  output: {
    filename: 'dist/draft-js-operation-transformation.min.js',
    libraryTarget: 'umd',
    library: 'draft-js-operation-transformation',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],
};
