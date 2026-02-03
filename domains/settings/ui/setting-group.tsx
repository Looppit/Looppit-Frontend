import { useRouter } from 'next/navigation';

import { cn } from '@/shared/utils';

import { SettingCardItem } from './setting-card-item';

import type { SettingGroup } from '../constants';

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
          <SettingCardItem
            key={child.href}
            label={child.label}
            onClick={() => router.push(child.href)}
          >
            <SettingCardItem.LeftIcon
              icon={child.icon.name}
              iconClassName={cn(
                child.icon.noneFill ? '' : 'fill-secondary',
                'text-secondary',
              )}
            />
          </SettingCardItem>
        ))}
      </div>
    </section>
  );
}
