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
    publicPath: '/',
    assetModuleFilename: "[hash][ext]",
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000
  },
  // devtool: 'inline-source-map',
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
          publicPath: 'img/',
          outputPath: 'img'
        }
      },
      {
        test: /\.svg$/i,
        type: 'asset',
        generator: {
          publicPath: 'svg/',
          outputPath: 'svg'
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
            options: {
              publicPath: 'css/'
            }
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