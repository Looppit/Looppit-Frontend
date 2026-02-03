import { StrictPropsWithChildren } from '@/shared/types/components';
import { BottomNavigation } from '@/shared/ui/bottom-navigation';
import { Spacing } from '@/shared/ui/spacing';

export default function SettingLayout({ children }: StrictPropsWithChildren) {
  return (
    <>
      {children}
      <Spacing size={65} />
      <div className="fixed bottom-0 w-full max-w-xl">
        <BottomNavigation />
      </div>
    </>
  );
}
