const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    product: './src/product.js',
    about: './src/about.js'
  },
  output: {
    filename: 'js/[name]-[fullhash:8].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    // publicPath: '/', //<- remove it or set a publicPath value (don't "")
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000
  },
  optimization: {
    runtimeChunk: 'single'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/page/index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'product.html',
      template: 'src/page/product.html',
      chunks: ['product']
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: 'src/page/about.html',
      chunks: ['about']
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name]-[fullhash:8].css",
      chunkFilename: "[id].css"
    })
  ],
  externals: {
    jquery: 'jQuery'
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          esModule: false
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'img/[name]-[hash:8][ext]'
        }
      },
      {
        test: /\.svg$/i,
        type: 'asset',
        generator: {
          filename: 'svg/[name]-[hash:8][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024 // 20kb
          }
        }
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS modules
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      // Options
                    }
                  ]
                ]
              }
            }
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },
      {
        test: /(\.jsx|\.js)$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  }
}