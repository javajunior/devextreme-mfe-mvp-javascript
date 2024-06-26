const { ModuleFederationPlugin } = require("webpack").container;

const deps = require("./package.json").dependencies;

module.exports = {
  mode: "development",
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  webpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: "host",
        filename: "remoteEntry.js",
        remotes: {
          remote1: "remote1@http://localhost:3001/remoteEntry.js",
          remote2: "remote2@http://localhost:3002/remoteEntry.js",
        },
        exposes: {},
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
          "react-router-dom": {
            singleton: true,
            requiredVersion: deps["react-router-dom"],
          },
          devextreme: {
            singleton: true,
            requiredVersion: deps["devextreme"],
          },
          "devextreme-react": {
            singleton: true,
            requiredVersion: deps["devextreme-react"],
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
