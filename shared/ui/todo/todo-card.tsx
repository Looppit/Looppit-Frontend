'use client';

import React from 'react';

import { Category } from '@/domains/category/types';
import { StrictPropsWithChildren } from '@/shared/types';
import { Checkbox } from '@/shared/ui/checkbox';
import { Icon } from '@/shared/ui/icon';
import { IconButton } from '@/shared/ui/icon-button';
import { Progress } from '@/shared/ui/progress';
import { cn, getGradient } from '@/shared/utils';

type TodoCardRootProps = React.ComponentProps<'div'>;

const TodoCardRoot = ({ className, children, ...props }: TodoCardRootProps) => {
  return (
    <div className={cn('gap-3.5', className)} {...props}>
      {children}
    </div>
  );
};

type TodoCardCategoryTitleProps = {
  /** 투두 카테고리 제목 */
  title: string;
  /** 투두 카테고리 색상 */
  color: Category['categoryColor'];
  /** 투두 카테고리 아이콘 */
  icon: Category['categoryIconName'];
  /** 타이틀 클릭시 실행 될 함수 */
  onTitleClick?: () => void;
};

const TodoCardCategoryTitle = ({
  title,
  color,
  icon,
  onTitleClick,
}: TodoCardCategoryTitleProps) => {
  return (
    <div className="flex items-center gap-2 flex-1 min-w-0">
      <div
        className="size-[22px] rounded-lg flex items-center justify-center text-white"
        style={{
          background: getGradient(color),
        }}
      >
        <Icon icon={icon} size="14" className="fill-current" />
      </div>
      <strong
        className="typography-title-medium tracking-tight flex-1 min-w-0"
        onClick={onTitleClick}
      >
        <span className="w-full truncate block text-white">{title}</span>
      </strong>
    </div>
  );
};

type TodoCardHeaderProps = StrictPropsWithChildren;

const TodoCardHeader = ({ children }: TodoCardHeaderProps) => {
  const childrenArray = React.Children.toArray(children);
  const firstChild = childrenArray[0];
  const restChildren = childrenArray.slice(1);

  return (
    <div className="flex items-center justify-between mb-2 w-full">
      {firstChild}
      {restChildren.length > 0 && (
        <div className="flex items-center gap-3 shrink-0">{restChildren}</div>
      )}
    </div>
  );
};

type TodoCardCategoryIconProps = {
  /** 투두 카테고리 색상 */
  color: Category['categoryColor'];
  /** 투두 카테고리 아이콘 */
  icon: Category['categoryIconName'];
};

const TodoCardCategoryIcon = ({ color, icon }: TodoCardCategoryIconProps) => {
  return (
    <div
      className="size-[22px] rounded-lg flex items-center justify-center text-white"
      style={{
        background: getGradient(color),
      }}
    >
      <Icon icon={icon} size="14" className="fill-current" />
    </div>
  );
};

type TodoCardTitleProps = {
  /** 투두 카테고리 제목 */
  title: string;
  /** 타이틀 클릭시 실행 될 함수 */
  onTitleClick?: () => void;
};

const TodoCardTitle = ({ title, onTitleClick }: TodoCardTitleProps) => {
  return (
    <strong
      className="typography-title-medium tracking-tight flex-1 min-w-0"
      onClick={onTitleClick}
    >
      <span className="w-full truncate block text-white">{title}</span>
    </strong>
  );
};

type TodoCardCountProps = {
  completedCount: number;
  totalCount: number;
};

const TodoCardCount = ({ completedCount, totalCount }: TodoCardCountProps) => {
  return (
    <div className="typography-caption-bold text-secondary/70">{`${completedCount} / ${totalCount}`}</div>
  );
};

type TodoCardAddButtonProps = {
  /** 추가 버튼 클릭시 실행 될 함수 */
  onAddClick?: () => void;
  /** 투두 카테고리 색상 */
  color: Category['categoryColor'];
};

const TodoCardAddButton = ({ onAddClick, color }: TodoCardAddButtonProps) => {
  return (
    <IconButton
      size="28"
      icon="ic_add"
      iconClassName="fill-current"
      style={{
        borderColor: `${color}40`,
        color,
      }}
      onClick={onAddClick}
    />
  );
};

const TodoItemGroup = ({ children }: StrictPropsWithChildren) => {
  return <div className="space-y-2.5 mt-3.5">{children}</div>;
};

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
  categoryColor?: Category['categoryColor'];
}

const TodoItem = ({
  label,
  isChecked,
  onCheckedChange,
  onLabelClick,
  className,
  categoryColor,
}: TodoItemProps) => {
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
};

type TodoActionsProps = {
  onOpenTodoActions: () => void;
  onDeleteTodo: () => void;
};

const TodoActionButtons = ({
  onOpenTodoActions,
  onDeleteTodo,
}: TodoActionsProps) => {
  return (
    <div className="shrink-0 w-[130px] flex items-center justify-center gap-2 px-3">
      <IconButton
        icon="ic_more_horiz"
        size="40"
        iconClassName="fill-current"
        className="bg-card-lighter text-secondary"
        onClick={onOpenTodoActions}
      />
      <IconButton
        icon="ic_delete"
        size="40"
        iconClassName="fill-current"
        className="bg-destructive text-white"
        onClick={onDeleteTodo}
      />
    </div>
  );
};

const TodoCard = Object.assign(TodoCardRoot, {
  Header: TodoCardHeader,
  CategoryTitle: TodoCardCategoryTitle,
  CategoryIcon: TodoCardCategoryIcon,
  Title: TodoCardTitle,
  Count: TodoCardCount,
  AddButton: TodoCardAddButton,
  ItemGroup: TodoItemGroup,
  Item: TodoItem,
  ActionButton: TodoActionButtons,
  Progress,
});

export { TodoCard };
