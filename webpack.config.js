// 有了这个配置文件，我们只需在终端中运行 npx webpack 命令就可进行打包，这条命令会自动引用 webpack.config.js 文件中的配置选项。
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCssWebpack = require('purifycss-webpack') // 引入PurifyCssWebpack插件
const glob = require('glob') // 引入glob模块,用于扫描全部html文件中所引用的css


// console.log(path.join(__dirname, "/webpack-src/index.js"));
module.exports = {
  mode: "development",
  entry: path.join(__dirname, "/webpack-src/index.js"),
  output: {
    path: path.join(__dirname, "/webpack-dist"),
    filename: "bundle.js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "webpack-index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    new CleanWebpackPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    require("autoprefixer"),
    new MiniCssExtractPlugin(),
    // 报错
    // new PurifyCssWebpack({
    //   paths: glob.sync(path.join(__dirname, 'webpack-src/*.html')) // 同步扫描所有html文件中所引用的css
    // })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          { loader: "css-loader" },
          {
            loader: "postcss-loader",
            // options: {
            //   postcssOptions: {
            //     plugins: [
            //       autoprefixer({
            //         overrideBrowerslist: [
            //           "last 10 Chrome versions",
            //           "last 5 Firefox version",
            //         ],
            //       }),
            //     ],
            //   },
            // },
          },
        ],
      },
      // {
      //   test: /\.(scss|sass)$/,
      //   use: ['style-loader', 'css-loader', 'sass-loader']
      // },{
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   include: [path.resolve('webpack-src')]
      // },{
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     name: utils.assetsPath('img/[name].[hash:7].[ext]')
      //   }
      // }
    ],
  },
  devServer: {
    // contentBase: './webpack-dist',
    static: "./webpack-dist",
    port: "8088",
    // inline: true,
    historyApiFallback: true,
    // hot: true
  },
};