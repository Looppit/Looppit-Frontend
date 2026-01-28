import Link from 'next/link';

import { Category } from '@/domains/category/types';
import { StrictPropsWithChildren } from '@/shared/types';
import { Icon } from '@/shared/ui/icon';
import { Skeleton } from '@/shared/ui/skeleton';
import { cn, getGradient } from '@/shared/utils';

type CategoryCardProps = Category;

const CategoryCardRoot = ({ children }: StrictPropsWithChildren) => {
  return <div className="grid grid-cols-3 gap-3 px-5">{children}</div>;
};

const CategoryCardItemFrame = ({
  children,
  className,
}: StrictPropsWithChildren & { className?: string }) => {
  return <div className={cn('pt-[100%] relative', className)}>{children}</div>;
};

const CategoryCardItemInner = ({ children }: StrictPropsWithChildren) => {
  return (
    <div className="absolute inset-0 size-full bg-card rounded-medium p-1 flex flex-col items-center justify-center gap-2 border border-white-soft transition-all shadow-lg">
      {children}
    </div>
  );
};

const CategoryCardItemIconSlot = ({ children }: StrictPropsWithChildren) => {
  return (
    <div className="size-10 rounded-small flex items-center justify-center mb-1 shadow-sm">
      {children}
    </div>
  );
};

const CategoryCardItem = ({
  id,
  categoryName,
  categoryIconName,
  categoryColor,
}: CategoryCardProps) => {
  return (
    <Link href={`category/${id}`}>
      <CategoryCardItemFrame className="cursor-pointer">
        <CategoryCardItemInner>
          <CategoryCardItemIconSlot>
            <div
              className="size-10 rounded-small flex items-center justify-center text-white"
              style={{ background: getGradient(categoryColor) }}
            >
              <Icon
                icon={categoryIconName}
                size="18"
                className="fill-current"
              />
            </div>
          </CategoryCardItemIconSlot>
          <span className="typography-caption-bold text-secondary text-center px-1 truncate w-full tracking-tight">
            {categoryName}
          </span>
        </CategoryCardItemInner>
      </CategoryCardItemFrame>
    </Link>
  );
};

const CategoryCardSkeletonItem = () => {
  return (
    <CategoryCardItemFrame>
      <CategoryCardItemInner>
        <CategoryCardItemIconSlot>
          <Skeleton className="size-10 rounded-small" />
        </CategoryCardItemIconSlot>
        <Skeleton className="w-3/4 h-3" />
      </CategoryCardItemInner>
    </CategoryCardItemFrame>
  );
};

const CategoryCard = Object.assign(CategoryCardRoot, {
  Root: CategoryCardRoot,
  Item: CategoryCardItem,
  SkeletonItem: CategoryCardSkeletonItem,
});

export { CategoryCard };
