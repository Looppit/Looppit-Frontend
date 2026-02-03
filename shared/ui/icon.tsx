import { type FC, type SVGProps } from 'react';

import * as categoryIcons from '@/shared/assets/category-icons';
import * as icons from '@/shared/assets/icons';
import { cn } from '@/shared/utils';

export type IconName = keyof typeof icons;
export type CategoryIconName = keyof typeof categoryIcons;

export type IconSize = '12' | '14' | '16' | '18' | '20' | '24' | '30' | '36';

export interface IconProps extends SVGProps<SVGElement> {
  /** 아이콘 이름 */
  icon: IconName | CategoryIconName;
  /** 아이콘 크기 (기본값: 24) */
  size?: IconSize;
}

export const allIcons: Record<IconProps['icon'], FC<SVGProps<SVGElement>>> = {
  ...categoryIcons,
  ...icons,
};

/**
 * `SVG` 아이콘 파일의 이름을 받아 컴포넌트로 출력합니다.
 */
const Icon = ({ icon, size = '24', className, style, ...rest }: IconProps) => {
  if (!icon) return null;

  const SVGIcon = allIcons[icon];

  return (
    <SVGIcon
      className={cn('inline-flex shrink-0', className)}
      style={style}
      width={size}
      height={size}
      {...rest}
    />
  );
};

export { Icon };
