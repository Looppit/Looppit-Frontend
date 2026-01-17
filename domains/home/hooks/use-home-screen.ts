import { useState } from 'react';

import { useCategories } from '@/domains/category/hooks';
import { useMergedTodos, useTodos } from '@/domains/home/hooks';
import { useSwipeable } from '@/shared/hooks';
import { dayjs } from '@/shared/lib';

export const useHomeScreen = () => {
  const [isAddTodoSheetOpen, setIsAddTodoSheetOpen] = useState(false);
  const [initialCategoryId, setInitialCategoryId] = useState<number | null>(
    null,
  );
  const [checkedTodos, setCheckedTodos] = useState<Record<number, boolean>>({});

  const { data: todosData = [], isPending: isTodosPending } = useTodos(
    dayjs().format('YYYY-MM'),
  );
  const { data: categories = [], isPending: isCategoriesPending } =
    useCategories();
  const { isOpened } = useSwipeable();

  const mergedTodos = useMergedTodos(todosData, categories);

  const handleAddTodo = (categoryId: number) => {
    setInitialCategoryId(categoryId);
    setIsAddTodoSheetOpen(true);
  };

  const handleClickTask = () => {
    if (isOpened) return;
  };

  const handleTodoCheckedChange = (todoId: number, checked: boolean) => {
    setCheckedTodos((prev) => ({
      ...prev,
      [todoId]: checked,
    }));
  };

  const handleSheetOpenChange = (open: boolean) => {
    setIsAddTodoSheetOpen(open);
  };

  return {
    mergedTodos,
    checkedTodos,
    isTodosPending,
    isCategoriesPending,
    isAddTodoSheetOpen,
    initialCategoryId,
    handleAddTodo,
    handleClickTask,
    handleTodoCheckedChange,
    handleSheetOpenChange,
  };
};
