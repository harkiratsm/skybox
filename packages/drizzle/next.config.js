/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      });
      return config;
    },
  };
  
  module.exports = nextConfig;