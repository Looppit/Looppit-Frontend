import localFont from 'next/font/local';

export const wantedSans = localFont({
  src: './WantedSansVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-wanted-sans',
});
