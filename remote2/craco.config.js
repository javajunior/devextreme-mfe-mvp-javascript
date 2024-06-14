const { ModuleFederationPlugin } = require("webpack").container;

const deps = require("./package.json").dependencies;

module.exports = {
  mode: "development",
  devServer: {
    port: 3002,
    historyApiFallback: true,
  },
  webpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: "remote2",
        filename: "remoteEntry.js",
        remotes: {},
        exposes: {
          "./App": "./src/App",
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps["react"],
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
    ],
    configure: {
      output: {
        publicPath: "auto",
      },
    },
  },
};
