import { TodoResponse } from '@/domains/home/types';

export const calculateProgress = (todos: TodoResponse[]): number => {
  if (todos.length === 0) return 0;
  const completedCount = todos.filter((todo) => todo.completed).length;
  return (completedCount / todos.length) * 100;
};
