const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'calendarLibrary',
    globalObject: 'this',
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/, // This is for SCSS files
        use: [
          'style-loader',  // Injects CSS into the DOM
          'css-loader',    // Turns CSS into CommonJS
          {
            loader: 'sass-loader', // Compiles SCSS to CSS
            options: {
              sourceMap: true, // Optional: Enables source maps for debugging
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'], // Add .scss to extensions
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Serve static files from 'dist'
    },
    compress: true,  // Enable gzip compression for everything served
    port: 3000,      // The port where the dev server will run
    historyApiFallback: true, // Fallback to index.html for SPA routes
    open: true,      // Automatically open the app in the default browser
  },
};
