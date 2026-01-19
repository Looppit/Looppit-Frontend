'use client';

import type React from 'react';

import { Checkbox } from '@/shared/ui/checkbox';
import { cn } from '@/shared/utils';

interface TodoItemProps {
  /** 투두 아이템 라벨 텍스트 */
  label: string;
  /** 체크 상태 */
  isChecked: boolean;
  /** 체크 상태 변경 핸들러 */
  onCheckedChange?: (checked: boolean) => void;
  /** 라벨 클릭 핸들러 */
  onLabelClick?: React.MouseEventHandler<HTMLDivElement>;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 카테고리 컬러 */
  categoryColor?: string;
}

function TodoItem({
  label,
  isChecked,
  onCheckedChange,
  onLabelClick,
  className,
  categoryColor,
}: TodoItemProps) {
  const handleCheckboxChange = (checked: boolean) => {
    if (onCheckedChange) {
      onCheckedChange(checked);
    }
  };

  const handleLabelClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onLabelClick) {
      onLabelClick(e);
    }
  };

  return (
    <div
      data-slot="todo-item"
      className={cn(
        'shrink-0 w-full px-5 py-4 rounded-small flex items-center gap-4 border border-white/5 shadow-sm transition-colors',
        'hover:border-white/10',
        isChecked ? 'bg-background/50' : 'bg-card',
        className,
      )}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={isChecked}
          onCheckedChange={handleCheckboxChange}
          className={cn(
            categoryColor &&
              'data-[state=checked]:bg-(--checkbox-checked-color) data-[state=checked]:border-(--checkbox-checked-color)',
          )}
          style={{
            ...(categoryColor && {
              ['--checkbox-checked-color' as string]: categoryColor,
            }),
          }}
        />
      </div>

      <div className="flex-1 cursor-pointer min-w-0" onClick={handleLabelClick}>
        <strong
          className={cn(
            'typography-body-semibold leading-snug transition-colors py-2 truncate block',
            isChecked ? 'text-secondary/40 line-through' : 'text-white',
          )}
        >
          {label}
        </strong>
      </div>
    </div>
  );
}

export { TodoItem };
export type { TodoItemProps };
