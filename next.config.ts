import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: 24,
            typescript: true,
            removeDimensions: true,
          },
        },
      ],
    });
    return config;
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: 24,
              typescript: true,
              removeDimensions: true,
            },
          },
        ],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
