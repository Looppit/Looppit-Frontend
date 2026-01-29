import { CategoryDetailHeaderFallback } from '@/domains/category/ui';

export const CategoryDetailNotFound = () => {
  return (
    <>
      <CategoryDetailHeaderFallback />
      <div className="text-secondary text-center typography-body-semibold py-8">
        카테고리를 찾을 수 없어요 🥹
      </div>
    </>
  );
};
