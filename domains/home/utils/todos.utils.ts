import { CategoryWithTodosResponse } from '@/domains/home/types';

export const updateTodoInCategory = (
  categories: CategoryWithTodosResponse[],
  categoryId: number,
  todoId: number,
  completed: boolean,
): CategoryWithTodosResponse[] => {
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
