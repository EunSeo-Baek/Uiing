const path = require('path');
const fs = require('fs');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

// App directory
const appDirectory = fs.realpathSync(process.cwd());

// Gets absolute path of file within app directory
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

// Host
const host = process.env.HOST || 'localhost';

// Required for babel-preset-react-app
process.env.NODE_ENV = 'development';

module.exports = {
  // Environment
  mode: 'development',

  // Entry point of app
  entry: resolveAppPath('./src'),

  // context: __dirname,
  output: {
    // Development filename output
    filename: 'static/js/bundle.js',
  },
  devServer: {
    // historyApiFallback: true,
    // contentBase: path.join(__dirname, 'dist'),
    contentBase: resolveAppPath('public'),
    compress: true,
    hot: true,
    port: 9000,
    publicPath: '/',
  },

  module: {
    rules: [
      // if you want to use jsx in your codes follow below rules
      // instead of
      // {
      //   test: /\.js$/,
      //   use: 'babel-loader',
      // },
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        include: resolveAppPath('src'),
        // use: 'babel-loader',
        loader: 'babel-loader',
        options: {
          presets: [
            // Preset includes JSX, TypeScript, and some ESnext featues
            require.resolve('babel-preset-react-app'),
          ]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: 'file-loader',
      }
    ]
  },
  plugins: [
    // Re-generate index.html with injected script tag.
    // The injected script tag contains a src value of the filename output defined above
    new HtmlWebPackPlugin({
      inject: true,
      template: resolveAppPath('public/index.html'),
      // themplate: path.resolve(__dirname, 'public/index.html'),
      // filename: 'index.html'
    }),
  ]
};
