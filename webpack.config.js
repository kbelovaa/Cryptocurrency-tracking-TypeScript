const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle[hash].js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      App: path.resolve(__dirname, 'src/app/'),
      Assets: path.resolve(__dirname, 'src/assets/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Constants: path.resolve(__dirname, 'src/constants/'),
      Context: path.resolve(__dirname, 'src/context/'),
      Hooks: path.resolve(__dirname, 'src/hooks/'),
      Pages: path.resolve(__dirname, 'src/pages/'),
      Services: path.resolve(__dirname, 'src/services/'),
      Store: path.resolve(__dirname, 'src/store/'),
      Types: path.resolve(__dirname, 'src/types/'),
      Utils: path.resolve(__dirname, 'src/utils/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/public/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new CleanWebpackPlugin(),
  ],
};
