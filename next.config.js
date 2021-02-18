const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
  webpack: (config) => {
    // config.module.rules.push({
    //   test: /\.(woff|woff2|eot|ttf|otf)$/,
    //   use: [
    //     {
    //       loader: "url-loader",
    //       options: {
    //         limit: 10000,
    //         fallback: "file-loader",
    //         name: "static/fonts/[name].[ext]",
    //       },
    //     },
    //   ],
    // });
    const env = new Dotenv({
      silent: true,
      path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
    });
    config.plugins.push(env);
    return config;
  },
  devIndicators: {
    autoPrerender: false,
  },
};
