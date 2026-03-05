import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useAtomValue } from 'jotai';

import { createCategory } from '@/domains/category/api/category.api';
import { DEFAULT_CATEGORY } from '@/domains/category/constants';
import { useCategories } from '@/domains/category/hooks';
import { createTodo, toggleTodoDone } from '@/domains/home/api/todo.api';
import { todoYearMonthAtom } from '@/domains/home/store';
import { invalidateTodoListQueries } from '@/domains/home/utils';

const SEED_TODOS = [
  {
    title: '플러스 버튼으로 할 일을 추가할 수 있어요 😎',
    markCompleted: false,
  },
  { title: '왼쪽으로 밀면 삭제할 수 있어요 ❌', markCompleted: false },
  { title: '누르면 수정할 수 있어요 👷🏻', markCompleted: false },
  { title: '끝나면 완료 표시로 꾸준함을 기록해요 📝', markCompleted: true },
] as const;

let hasRun = false;

export const useSeedInitialData = () => {
  const { data = [], isSuccess } = useCategories();
  const queryClient = useQueryClient();
  const yearMonth = useAtomValue(todoYearMonthAtom);

  useEffect(() => {
    if (hasRun) return;
    if (!isSuccess || data.length !== 0) return;

    hasRun = true;

    const runOnce = async () => {
      try {
        const category = await createCategory(DEFAULT_CATEGORY);
        const categoryId = category.id;
        const date = format(new Date(), 'yyyy-MM-dd');

        for (const { title, markCompleted } of SEED_TODOS) {
          const result = await createTodo({
            categoryId,
            data: { title, date },
          });

          const todoId = result.id;
          if (!markCompleted || todoId == null) continue;

          await toggleTodoDone({ categoryId, todoId, completed: true });
        }
      } finally {
        invalidateTodoListQueries(queryClient, yearMonth);
      }
    };

    runOnce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return null;
};
