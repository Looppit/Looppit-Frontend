import type { Metadata } from 'next';

import './globals.css';
import { wantedSans } from '@/shared/assets/fonts';
import { ASSET_URL, PROJECT_ENV } from '@/shared/constants';
import { Providers } from '@/shared/providers';
import { Toaster } from '@/shared/ui/sonner';

export const metadata: Metadata = {
  title: 'Looppit - 작은 습관부터 시작하는 루프핏',
  description: '매일 하는 것들을 기록하고, 자연스럽게 습관으로 이어가 보세요',
  openGraph: {
    siteName: 'Looppit',
    type: 'website',
    locale: 'ko_KR',
    title: 'Looppit - 작은 습관부터 시작하는 루프핏',
    description: '매일 하는 것들을 기록하고, 자연스럽게 습관으로 이어가 보세요',
    url: PROJECT_ENV.domain,
    images: [
      {
        url: ASSET_URL.OPEN_GRAPH_IMAGE,
        alt: 'Looppit Open Graph Image',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${wantedSans.variable} overflow-y-scroll bg-background text-white font-wanted-sans antialiased`}
      >
        <div className="relative mx-auto min-h-screen max-w-xl">
          <Providers>{children}</Providers>
        </div>
        <Toaster
          position="bottom-center"
          offset={{ bottom: 60, left: 24, right: 24 }}
          mobileOffset={{ bottom: 60, left: 24, right: 24 }}
        />
      </body>
    </html>
  );
}
