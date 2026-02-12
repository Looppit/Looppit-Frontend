import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /**
   * PostHog API는 /e/ 등 trailing slash를 사용함.
   * Next는 기본으로 슬래시 제거 후 리다이렉트하므로
   * 이 옵션 없으면 이벤트 수집 요청이 끊겨 데이터 유실 가능 (PostHog proxy 문서 권장)
   */
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'looppit.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: '/api/proxy/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ];
  },
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
