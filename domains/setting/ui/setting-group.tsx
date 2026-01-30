import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/button';
import { IconButton } from '@/shared/ui/icon-button';
import { cn } from '@/shared/utils';

import type { SettingGroup } from '../setting.constants';

type SettingGroupProps = SettingGroup;

export function SettingGroup({ label, childrens }: SettingGroupProps) {
  const router = useRouter();

  return (
    <section className="space-y-3">
      <h3 className="text-secondary typography-caption-medium font-bold uppercase pl-1 opacity-60">
        {label}
      </h3>
      <div className="bg-card rounded-small border border-white/10 overflow-hidden shadow-lg divide-y divide-white/5">
        {childrens.map((child) => (
          <div
            className="pr-4 flex items-center justify-between"
            key={child.href}
          >
            <Button
              variant="ghost"
              onClick={() => router.push(child.href)}
              align="start"
              className="typography-caption-medium gap-2 text-white/90"
            >
              <Button.OutlineIcon
                icon={child.icon.name}
                iconClassName={cn(
                  child.icon.noneFill ? '' : 'fill-secondary opacity-40',
                  'text-secondary opacity-40',
                )}
                className="bg-white/5 size-8"
              />
              {child.label}
            </Button>
            <IconButton
              className="border-none"
              icon="ic_chevron_right"
              size="28"
              iconClassName="fill-secondary opacity-40"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
