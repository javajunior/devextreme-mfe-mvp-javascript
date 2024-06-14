const { ModuleFederationPlugin } = require("webpack").container;

const deps = require("./package.json").dependencies;

module.exports = {
  mode: "development",
  devServer: {
    port: 3001,
    historyApiFallback: true,
  },
  webpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: "remote1",
        filename: "remoteEntry.js",
        remotes: {},
        exposes: {
          "./TaskList": "./src/TaskList",
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
