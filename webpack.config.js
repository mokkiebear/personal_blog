const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = (env) => {
  const isProduction = env === "production";
  return {
    entry: "./src/index.tsx",

    mode: "development",

    devServer: {
      historyApiFallback: true,
    },

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.min.js",
      publicPath: "/",
    },

    resolve: {
      modules: [path.join(__dirname, "src"), "node_modules"],
      alias: {
        react: path.join(__dirname, "node_modules", "react"),
        src: path.join(__dirname, "src"),
        components: path.join(__dirname, "src/components"),
      },
      extensions: [".tsx", ".ts", ".js", ".scss"],
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          include: [path.resolve(__dirname, "src")],
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
        {
          test: /\.ejs$/,
          loader: "ejs-loader",
          options: {
            variable: "data",
            interpolate: "\\{\\{(.+?)\\}\\}",
            evaluate: "\\[\\[(.+?)\\]\\]",
          },
        },
      ],
    },

    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebPackPlugin({
        inject: true,
        template: "./public/index.ejs",
        templateParameters: {
          title: "Maxxi's blog",
        },
      }),
    ],
  };
};
