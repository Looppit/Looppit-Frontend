import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
import webpack from 'webpack';

import type { StorybookConfig } from '@storybook/nextjs';

/**
 * @note
 * 로컬 개발 환경에서만 .env.local 파일 로드
 * 컴포넌트에 env 의존성이 있으므로 load 하지 않으면 에러가 발생함
 * Vercel 배포 시에는 환경 변수가 자동으로 주입되므로 dotenv 불필요
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envLocalPath = path.resolve(__dirname, '../.env.local');

if (existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
}

const config: StorybookConfig = {
  stories: [
    '../shared/stories/**/*.mdx',
    '../**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: ['@storybook/addon-docs'],
  framework: '@storybook/nextjs',
  staticDirs: ['../public'],

  webpackFinal: async (config) => {
    // 환경 변수를 클라이언트 번들에 주입
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NEXT_PUBLIC_API_BASE_URL': JSON.stringify(
          process.env.NEXT_PUBLIC_API_BASE_URL!,
        ),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV!),
      }),
    );

    // SVG를 React 컴포넌트로 변환하는 Webpack 설정
    // next.config.ts와 동일한 설정 적용
    config.module = config.module || { rules: [] };
    config.module.rules = config.module.rules || [];

    // 기존 SVG 규칙 제거 (있다면)
    config.module.rules = config.module.rules.filter(
      (rule) =>
        !(typeof rule === 'object' && rule?.test?.toString().includes('svg')),
    );

    // SVG를 React 컴포넌트로 처리하는 규칙 추가
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
};
export default config;
