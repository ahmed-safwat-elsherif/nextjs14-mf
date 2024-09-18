// eslint-disable-next-line @typescript-eslint/no-var-requires
const NextFederationPlugin = require("@module-federation/nextjs-mf");

const isMfDisabled = process.env.NEXT_NO_MF === "true";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    if (!isMfDisabled) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "remote", // Name of the remote app
          filename: "static/chunks/remoteEntry.js",
          exposes: {
            "./Test": "./src/widgets/Test.tsx", // Expose the component
          },
          shared: {
            // react: {
            //   singleton: true,
            //   requiredVersion: false,
            //   eager: true,
            // },
            "react-dom": {
              singleton: true,
              requiredVersion: false,
              eager: true,
            },
            // i18next: {
            //   singleton: true,
            //   requiredVersion: false,
            //   eager: true,
            // },
            // "react-i18next": {
            //   singleton: true,
            //   requiredVersion: false,
            //   eager: true,
            // },
            next: {
              singleton: true,
              requiredVersion: false,
              eager: true,
            },
            // "next-i18next": {
            //   singleton: true,
            //   requiredVersion: false,
            //   eager: true,
            // },
            // "@mui/material": {
            //   singleton: true,
            //   requiredVersion: false,
            //   eager: true,
            // },
            // "@emotion/react": {
            //   singleton: true,
            //   requiredVersion: false,
            //   eager: true,
            // },
            // "@emotion/styled": {
            //   singleton: true,
            //   requiredVersion: false,
            //   eager: true,
            // },
          },
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;
