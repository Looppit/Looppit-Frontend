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
}

function TodoItem({
  label,
  isChecked,
  onCheckedChange,
  onLabelClick,
  className,
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
        <Checkbox checked={isChecked} onCheckedChange={handleCheckboxChange} />
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
