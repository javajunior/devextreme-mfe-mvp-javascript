# Convert Create-React-App Project to Micro-Frontend with Module Federation using CRACO

## Overview

This guide explains how to convert a Create-React-App (CRA) project into a micro-frontend architecture using Module Federation with the help of CRACO (Create React App Configuration Override). CRACO allows you to configure CRA without ejecting, making it easier to customize your setup to integrate Webpack Module Federation.

## Why Craco?

### Craco - Create React App Configuration Override

Craco is an easy and comprehensible configuration layer for create-react-app ###

According with craco NPM documentation:
To customize most things when using Create React App, you can eject. However, you'll then need to maintain every configuration and script yourself, which can be a bit annoying. CRACO, which stands for Create React App Configuration Override, allows you to get all of the benefits of Create React App without ejecting. Customize your configurations ESLint, Babel, PostCSS, and many more with just a single configuration file at the root of your project.

## Prerequisites

Ensure your project meets the following requirements before proceeding:

- **Create-React-App**: Since Module Federation is a Webpack 5 plugin, your project should be using Create-React-App v5.0.0 or newer, as older versions are based on Webpack 4, which does not support Module Federation.
  - [Create-React-App Releases](https://github.com/facebook/create-react-app/releases): Refer to the official release notes for migration guides. We suggest to use the latest version, which is the v.5.0.1 at the time of writing.

If your project has been scaffolded using previous version of create-react-app, you must migrate it before continue.

## Installation Steps

### 1. Install CRACO

Navigate to your project's root directory and install CRACO as a development dependency:

```sh
cd existing-create-react-project
npm i -D @craco/craco
```

### 2. Create CRACO Configuration

Create a craco.config.js file in your project's root directory to configure CRACO:

```sh
  existing-create-react-project
  ├── src
+ ├── ├── craco.config.js
  └── package.json
```

### 3. Configure craco.config.js

Configure the craco.config.js with the necessary Webpack Module Federation settings:

```sh
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
        name: "host",
        remotes: {
          // Example: remoteApp: "remoteApp@http://localhost:3002/remoteEntry.js"
        },
        exposes: {
            // Example: "./Button": "./src/components/Button"
        },
        shared: {
          ...deps,
          // adds react as shared module
          react: {
            singleton: true,
            requiredVersion: deps["react"],
          },
          // adds react-dom as shared module
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
    ],
  },
  configure: {
    output: {
      publicPath: "auto",
    },
  },
};
```

Configuration Details

**name**: The unique identifier for the module federation container.

**filename**: The output filename for the manifest file (default: remoteEntry.js).

**remotes**: Define remote modules that the host application will consume.

**exposes**: Define the local modules that will be exposed to other micro-frontends.

**shared**: Dependencies that should be shared across the federated modules to avoid duplication.

### 4. Update package.json Scripts

Replace the existing calls to react-scripts with craco in the scripts section of your **package.json** to use the craco CLI:

```sh
"scripts": {
-  "start": "react-scripts start"
+  "start": "craco start"
-  "build": "react-scripts build"
+  "build": "craco build"
-  "test": "react-scripts test"
+  "test": "craco test"
}
```

### 5. Bootstrap.js file

1. Create a file called **src/bootstrap.js**:

```sh
  existing-create-react-project
  ├── src
+ ├──├── bootstrap.js
```

2. Move the content from **src/index.js** to **src/bootstrap.js**:

3. Update **src/index.js** to:

```sh
import("./bootstrap");
```

## Final steps

### Configure Federation

Update the remotes and exposes fields in craco.config.js according to your project's specific needs (whether it's a host or remote module).

### Example Configuration for Remote Module

```sh
exposes: {
  "./Button": "./src/components/Button",
}
```

### Example Configuration for Host Module

```sh
remotes: {
  remote: "remote@http://localhost:3000/remoteEntry.js",
}
```

### Example Usage in Components

```sh
const RemoteButton = React.lazy(() => import("remote/Button"));

function App() {
  return (
    <div>
      <h1>Host Application</h1>
      <React.Suspense fallback="Loading Button...">
        <RemoteButton />
      </React.Suspense>
    </div>
  );
}
```

## Troubleshooting

- Compatibility Issues: Ensure all federated modules use compatible versions of shared libraries to prevent conflicts.

## Useful links

- [Module Federation](https://module-federation.io/) - The offical docs of Module Federation
- [Module Federation](https://webpack.js.org/concepts/module-federation/) - The Webpack Module Federation concept
- [Module Federation Plugin](https://webpack.js.org/plugins/module-federation-plugin/) - The plugin docs
- [Create-React-App](https://github.com/facebook/create-react-app/) - Github of Create-React-App
- [Craco](https://craco.js.org/) - Configure CRA without ejecting.