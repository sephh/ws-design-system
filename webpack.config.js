const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.ts',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ws-design-system',
    libraryTarget: 'commonjs2',
  },

  externals: [nodeExternals()],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [
      new TsconfigPathsPlugin({
        /* options: see below */
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: './package.json',
          to: './package.json',
          transform(content) {
            const packageJson = JSON.parse(content.toString());
            packageJson.peerDependencies = packageJson.dependencies;

            delete packageJson.devDependencies;
            delete packageJson.dependencies;

            return JSON.stringify(packageJson);
          },
        },
      ],
    }),
  ],
};
