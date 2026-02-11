import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 | Looppit',
  description:
    'Looppit 서비스의 개인정보 수집·이용·보관·파기 및 이용자 권리에 대한 안내입니다.',
};

export default function PrivacyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
