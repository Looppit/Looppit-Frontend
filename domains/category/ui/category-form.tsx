import { type ReactNode } from 'react';

import { CategoryColor } from '@/domains/category/constants';
import { getIconOptionButtonClassName } from '@/domains/category/utils';
import { Button } from '@/shared/ui/button';
import { FieldError, FieldLabel } from '@/shared/ui/field';
import { CategoryIconName, Icon } from '@/shared/ui/icon';
import { IconButton } from '@/shared/ui/icon-button';
import { Input } from '@/shared/ui/input';
import { cn, getGradient } from '@/shared/utils';

type CategoryFormRootProps = {
  children: ReactNode;
};

const CategoryFormRoot = ({ children }: CategoryFormRootProps) => {
  return (
    <div className="flex-1 overflow-y-auto px-6 pt-6 no-scrollbar space-y-7">
      {children}
    </div>
  );
};

type CategoryFormPreviewProps = {
  icon: CategoryIconName;
  color: CategoryColor;
};

const CategoryFormPreview = ({ icon, color }: CategoryFormPreviewProps) => {
  if (!icon) return null;

  return (
    <div className="flex justify-center mb-8">
      <div
        className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center shadow-lg relative ring-4 ring-background transition-all duration-300"
        style={{ background: getGradient(color) }}
      >
        <Icon icon={icon} size="24" className="fill-white" />
      </div>
    </div>
  );
};

type CategoryFormInputProps = {
  value: string;
  onChange: (value: string) => void;
  error?: { message?: string };
} & Omit<React.ComponentProps<'input'>, 'onChange' | 'value'>;

const CategoryFormInput = ({
  value,
  onChange,
  error,
  ...props
}: CategoryFormInputProps) => {
  return (
    <div className="space-y-2">
      <FieldLabel>카테고리 이름</FieldLabel>
      <Input
        placeholder="예: 운동, 공부"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
      <FieldError errors={error ? [error] : undefined} />
    </div>
  );
};

type CategoryFormIconSelectorProps = {
  icons: CategoryIconName[];
  selectedIcon?: CategoryIconName;
  onIconChange: (icon: CategoryIconName) => void;
  onMoreOpen: () => void;
};

const CategoryFormIconSelector = ({
  icons,
  selectedIcon,
  onIconChange,
  onMoreOpen,
}: CategoryFormIconSelectorProps) => {
  return (
    <div className="space-y-3.5">
      <FieldLabel>아이콘 선택</FieldLabel>
      <div className="grid grid-cols-5 gap-3">
        {icons.map((icon) => {
          const isSelected = selectedIcon === icon;

          return (
            <IconButton
              key={icon}
              icon={icon}
              size="36"
              type="button"
              onClick={() => onIconChange(icon)}
              className={getIconOptionButtonClassName(isSelected)}
              iconClassName="fill-current"
            />
          );
        })}
        <IconButton
          key="ic_more_horiz"
          icon="ic_more_horiz"
          size="36"
          type="button"
          onClick={onMoreOpen}
          className={getIconOptionButtonClassName(false)}
          iconClassName="fill-current"
        />
      </div>
    </div>
  );
};

type CategoryFormColorSelectorProps = {
  colors: readonly CategoryColor[];
  selectedColor: CategoryColor;
  onColorChange: (color: CategoryColor) => void;
};

const CategoryFormColorSelector = ({
  colors,
  selectedColor,
  onColorChange,
}: CategoryFormColorSelectorProps) => {
  return (
    <div className="space-y-4 pb-12">
      <FieldLabel>색상 테마</FieldLabel>
      <div className="flex items-center gap-4 px-1">
        {colors.map((colorOption) => {
          const isSelected = selectedColor === colorOption;

          return (
            <button
              key={colorOption}
              type="button"
              onClick={() => onColorChange(colorOption)}
              className="relative flex items-center justify-center w-10 h-10 group"
            >
              {isSelected && (
                <div
                  className="absolute inset-0 rounded-full blur-sm opacity-40 transition-all duration-300"
                  style={{ backgroundColor: colorOption }}
                />
              )}
              <div
                className="absolute inset-0 rounded-full border-2 transition-all duration-300"
                style={{
                  borderColor: isSelected ? colorOption : 'var(--white-soft)',
                }}
              />
              <div
                className={cn(
                  `rounded-full transition-all duration-300 relative size-7`,
                  isSelected ? 'size-7' : 'size-7.5 hover:scale-105',
                )}
                style={{ background: getGradient(colorOption) }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

type CategoryFormSubmitButtonProps = {
  disabled: boolean;
  onClick: () => void;
  isSubmitting: boolean;
  buttonText: string;
};

const CategoryFormSubmitButton = ({
  disabled,
  onClick,
  isSubmitting,
  buttonText,
}: CategoryFormSubmitButtonProps) => {
  return (
    <>
      <div className="h-[60px]" />
      <div className="px-6 pb-6 fixed w-full max-w-xl bottom-[60px] z-1">
        <Button
          onClick={onClick}
          disabled={disabled || isSubmitting}
          className="w-full"
        >
          {buttonText}
        </Button>
      </div>
    </>
  );
};

export const CategoryForm = Object.assign(CategoryFormRoot, {
  Preview: CategoryFormPreview,
  Input: CategoryFormInput,
  IconSelector: CategoryFormIconSelector,
  ColorSelector: CategoryFormColorSelector,
  SubmitButton: CategoryFormSubmitButton,
});
