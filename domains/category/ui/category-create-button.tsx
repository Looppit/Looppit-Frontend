'use client';

import { useRouter } from 'next/navigation';

import { IconButton } from '@/shared/ui/icon-button';

export const CategoryCreateButton = () => {
  const router = useRouter();

  const handleCreateCategory = () => {
    router.push('/category/add');
  };

  return (
    <IconButton
      icon="ic_add"
      size="40"
      className="fixed bottom-[100px] right-4 bg-primary text-white"
      iconClassName="fill-current"
      onClick={handleCreateCategory}
    />
  );
};
