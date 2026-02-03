import { Button } from '@/shared/ui/button';
import { IconName } from '@/shared/ui/icon';
import { IconButton } from '@/shared/ui/icon-button';
import { cn } from '@/shared/utils';

interface SettingCardLeftIconProps {
  icon: IconName;
  className?: string;
  iconClassName?: string;
}

function SettingCardLeftIcon({
  icon,
  className,
  iconClassName,
}: SettingCardLeftIconProps) {
  return (
    <Button.OutlineIcon
      icon={icon}
      iconClassName={cn(iconClassName)}
      className={cn('bg-white/5 size-8', className)}
    />
  );
}

interface SettingCardItemRootProps {
  label: string;
  variant?: 'ghost' | 'outline';
  onClick?: () => void;
  children?: React.ReactNode;
}

function SettingCardItemRoot({
  label,
  variant = 'ghost',
  onClick,
  children,
}: SettingCardItemRootProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'pr-4 flex items-center justify-between',
        variant === 'outline' &&
          'bg-card rounded-small border border-white/10 overflow-hidden shadow-lg divide-y divide-white/5',
      )}
    >
      <Button
        variant="ghost"
        align="start"
        className="typography-caption-medium gap-2 text-white/90"
      >
        {children}
        {label}
      </Button>
      <IconButton
        className="border-none"
        icon="ic_chevron_right"
        size="28"
        iconClassName="fill-secondary opacity-40"
      />
    </div>
  );
}

const SettingCardItem = Object.assign(SettingCardItemRoot, {
  LeftIcon: SettingCardLeftIcon,
});

export { SettingCardItem };
