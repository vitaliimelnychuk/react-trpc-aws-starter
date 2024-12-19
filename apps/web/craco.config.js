const path = require('path');
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // This adds the rule for ts-loader for handling TypeScript files
      webpackConfig.module.rules.push({
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      });
      return webpackConfig;
    },
    alias: {
      '@web': path.resolve(__dirname, 'src'),
      '@api': path.resolve(__dirname, '../api/src')
    },
    configure: (webpackConfig) => {
      // This adds the rule for ts-loader for handling TypeScript files
      webpackConfig.module.rules.push({
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      });
      return webpackConfig;
    },
  }
};
