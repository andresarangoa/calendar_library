// webpack.config.js
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: "calendarLibrary",
    libraryTarget: "umd",
    globalObject: "this",
  },

  module: {
    rules: [
      /* ── JS / JSX ───────────────────────*/
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },

      /* ── Plain CSS  (Tailwind entry file) */
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },

      /* ── SCSS  ───────────────────────────*/
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",   // runs Tailwind + Autoprefixer
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
      },

      /* ── Images ─────────────────────────*/
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: { filename: "../assets/[name][ext]" },
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx", ".scss", ".css"],
  },

  externals: {
    react: "react",
    "react-dom": "react-dom",
  },

  devServer: {
    static: { directory: path.join(__dirname, "dist") },
    compress: true,
    port: 3000,
    historyApiFallback: true,
    open: true,
  },
};
