import { CategoryTodoApiResponse } from '@/domains/home/types/todo.types';

export const updateTodoInCategory = (
  categories: CategoryTodoApiResponse[],
  categoryId: number,
  todoId: number,
  completed: boolean,
): CategoryTodoApiResponse[] => {
  return categories.map((category) => {
    if (category.categoryId !== categoryId) {
      return category;
    }

    return {
      ...category,
      todo: category.todo.map((todo) =>
        todo.todoId === todoId ? { ...todo, completed } : todo,
      ),
    };
  });
};
