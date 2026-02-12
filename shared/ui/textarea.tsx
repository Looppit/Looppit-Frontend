import * as React from 'react';

import { cn } from '@/shared/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'w-full h-50 px-5 py-3 outline-none transition-colors typography-body-semibold rounded-small border border-white/5',
        'bg-card text-white focus-visible:border-primary/50 resize-none placeholder:text-secondary/20',
        'disabled:bg-card/50 disabled:text-white/30',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
