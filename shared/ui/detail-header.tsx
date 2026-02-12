'use client';

import { Icon, IconName } from '@/shared/ui/icon';
import { cn } from '@/shared/utils';

export type DetailHeaderProps = {
  /** 헤더 타이틀 (빈 문자열 가능) */
  title: string;
  /** 왼쪽 버튼 아이콘 (기본값: ic_arrow_back_ios_new) */
  leftIcon?: IconName;
  /** 오른쪽 버튼 아이콘 (없으면 렌더링 안 함) */
  rightIcon?: IconName;
  /** 왼쪽 버튼 클릭 핸들러 */
  onLeftClick?: () => void;
  /** 오른쪽 버튼 클릭 핸들러 */
  onRightClick?: () => void;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 왼쪽 버튼 아이콘 클래스 */
  leftIconClassName?: string;
  /** 오른쪽 버튼 아이콘 클래스 */
  rightIconClassName?: string;
};

/**
 * 상세 페이지 헤더 컴포넌트
 * 왼쪽 뒤로가기 버튼, 중앙 타이틀, 오른쪽 액션 버튼으로 구성됩니다.
 */
export const DetailHeader = ({
  title,
  leftIcon = 'ic_arrow_back_ios_new',
  rightIcon,
  onLeftClick,
  onRightClick,
  className,
  leftIconClassName,
  rightIconClassName,
}: DetailHeaderProps) => {
  return (
    <header
      className={cn(
        'sticky top-0 px-5 z-10 py-6 flex items-center justify-between bg-background w-full shrink-0',
        className,
      )}
    >
      <div className="w-10 flex items-center">
        <button
          type="button"
          onClick={onLeftClick}
          className={cn(
            'w-8 h-8 flex items-center justify-center rounded-full text-white active:scale-90 transition-all',
            leftIconClassName,
          )}
        >
          <Icon icon={leftIcon} size="20" className="fill-current" />
        </button>
      </div>
      <h1 className="flex-1 text-center typography-title-medium truncate block tracking-tight text-white/90">
        {title}
      </h1>
      <div className="w-10 flex items-center justify-end">
        {rightIcon && (
          <button
            type="button"
            onClick={onRightClick}
            className={cn(
              'w-8 h-8 flex items-center justify-center rounded-full text-white active:scale-90 transition-all',
              rightIconClassName,
            )}
          >
            <Icon icon={rightIcon} size="24" className="fill-current" />
          </button>
        )}
      </div>
    </header>
  );
};
