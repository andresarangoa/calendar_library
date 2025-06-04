const path = require('path');

module.exports = {
  mode: 'development',
  entry: './demo/App.jsx',
  output: {
    path: path.resolve(__dirname, 'demo'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/, // Handle regular CSS files
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/, // Handle SCSS files
        use: [
          'style-loader',  // Injects CSS into the DOM
          'css-loader',    // Turns CSS into CommonJS
          {
            loader: 'sass-loader', // Compiles SCSS to CSS
            options: {
              sourceMap: true, // Optional: Enable source maps
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'], // Add .scss to extensions
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'demo'),
    },
    compress: true,
    port: 3000,
    hot: true, // Enable hot module replacement
    open: true, // Automatically open the browsera
  },
};
