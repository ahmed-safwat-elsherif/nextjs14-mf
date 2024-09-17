const NextFederationPlugin = require('@module-federation/nextjs-mf');


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'remote',  // Name of the remote app
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Test': './src/components/Test.tsx', // Expose the component
        },
        shared: {
          // Add shared dependencies if any
          react: { singleton: true },
          'react-dom': { singleton: true },
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;
