import { useRouter } from 'next/navigation';

import { StrictPropsWithChildren } from '@/shared/types';
import { DetailHeader } from '@/shared/ui/detail-header';

import { HELP_TITLE } from '../constants/help.constants';

const HelpSectionRoot = ({ children }: StrictPropsWithChildren) => {
  return (
    <div className="flex flex-col h-dvh overflow-hidden fixed z-10 w-full max-w-xl bg-background">
      {children}
    </div>
  );
};

const HelpSectionHeader = () => {
  const router = useRouter();

  return (
    <DetailHeader
      title={HELP_TITLE}
      onLeftClick={() => router.back()}
      leftIconClassName="cursor-pointer"
    />
  );
};

interface HelpSectionContentProps {
  hint: string;
}

const HelpSectionContent = ({
  children,
  hint,
}: StrictPropsWithChildren<HelpSectionContentProps>) => {
  return (
    <div className="flex flex-col px-6 flex-1 overflow-y-auto pb-48">
      <div className="w-full mt-6 mb-6">
        <h2 className="typography-title-medium leading-snug mb-3">
          {HELP_TITLE}
        </h2>
        {hint && (
          <p className="typography-body-semibold text-secondary/60">{hint}</p>
        )}
      </div>
      {children}
    </div>
  );
};

const HelpSectionBottom = ({ children }: StrictPropsWithChildren) => {
  return (
    <div className="absolute bottom-0 left-0 w-full px-6 pb-12 pt-10 z-10 bg-background">
      {children}
    </div>
  );
};

const HelpSection = Object.assign(HelpSectionRoot, {
  Root: HelpSectionRoot,
  Header: HelpSectionHeader,
  Content: HelpSectionContent,
  Bottom: HelpSectionBottom,
});

export { HelpSection };
