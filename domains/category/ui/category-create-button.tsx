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
      className="sticky bottom-[100px] ml-auto mr-4 block bg-primary text-white"
      iconClassName="fill-current"
      onClick={handleCreateCategory}
    />
  );
};
