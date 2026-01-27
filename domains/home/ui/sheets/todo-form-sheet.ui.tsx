import { type ReactNode } from 'react';

import { Category } from '@/domains/category/types';
import { dayjs } from '@/shared/lib';
import { Chip } from '@/shared/ui/chip';
import { Icon } from '@/shared/ui/icon';
import { IconButton } from '@/shared/ui/icon-button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui/sheet';

type TodoFormSheetRootProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: ReactNode;
};

const TodoFormSheetRoot = ({
  open,
  onOpenChange,
  title = '투두',
  children,
}: TodoFormSheetRootProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="bg-card rounded-t-3xl p-6">
        <SheetHeader className="sr-only">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <div className="flex flex-col gap-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
};

type TodoFormSheetInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
} & Omit<React.ComponentProps<'input'>, 'onChange' | 'onKeyDown' | 'type'>;

const TodoFormSheetInput = ({
  value,
  onChange,
  onSubmit,
  placeholder = '할 일을 입력하세요',
  ...props
}: TodoFormSheetInputProps) => {
  return (
    <input
      placeholder={placeholder}
      className="w-full bg-transparent border-none text-[18px] font-bold text-white placeholder:text-white/20 outline-none p-0"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onSubmit();
        }
      }}
      {...props}
    />
  );
};

type TodoFormSheetOptionsBarProps = {
  date: string;
  selectedCategory: Category | undefined;
  onDateClick: () => void;
  onCategoryClick: () => void;
};

const TodoFormSheetOptionsBar = ({
  date,
  selectedCategory,
  onDateClick,
  onCategoryClick,
}: TodoFormSheetOptionsBarProps) => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
      <Chip asChild size="md">
        <button
          type="button"
          onClick={onDateClick}
          className="typography-body-semibold text-white"
        >
          <Icon icon="ic_calendar_month" size="16" className="fill-current" />
          {dayjs(date).format('M. D. (ddd)')}
        </button>
      </Chip>
      <Chip asChild onClick={onCategoryClick} size="md">
        <button type="button">
          {selectedCategory ? (
            <>
              <div
                className="size-2.5 rounded-full shadow-sm mr-1"
                style={{ backgroundColor: selectedCategory.categoryColor }}
              />
              <span className="typography-body-semibold">
                {selectedCategory.categoryName}
              </span>
            </>
          ) : (
            <span className="typography-body-semibold">카테고리 선택</span>
          )}
          <Icon
            icon="ic_keyboard_arrow_down"
            size="14"
            className="opacity-50 fill-white"
          />
        </button>
      </Chip>
    </div>
  );
};

type TodoFormSheetSuggestedTagsProps = {
  onTagClick: (tag: string) => void;
  tags?: readonly string[];
};

const DEFAULT_SUGGESTED_TAGS = [
  '미팅하기',
  '보고서쓰기',
  '이메일 보내기',
  '디자인하기',
] as const;

const TodoFormSheetSuggestedTags = ({
  onTagClick,
  tags = DEFAULT_SUGGESTED_TAGS,
}: TodoFormSheetSuggestedTagsProps) => {
  return (
    <div className="flex-1 overflow-x-auto pb-1 no-scrollbar">
      <div className="flex items-center gap-2 whitespace-nowrap">
        {tags.map((tag) => (
          <Chip
            asChild
            key={tag}
            variant="ghost"
            onClick={() => onTagClick(tag)}
          >
            <button type="button">{tag}</button>
          </Chip>
        ))}
      </div>
    </div>
  );
};

type TodoFormSheetSubmitButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

const TodoFormSheetSubmitButton = ({
  disabled,
  onClick,
}: TodoFormSheetSubmitButtonProps) => {
  return (
    <IconButton
      icon="ic_arrow_upward"
      size="40"
      className="bg-primary border-primary text-white"
      iconClassName="fill-current"
      disabled={disabled}
      onClick={onClick}
    />
  );
};

export const TodoFormSheetUI = Object.assign(TodoFormSheetRoot, {
  Input: TodoFormSheetInput,
  OptionsBar: TodoFormSheetOptionsBar,
  SuggestedTags: TodoFormSheetSuggestedTags,
  SubmitButton: TodoFormSheetSubmitButton,
});
