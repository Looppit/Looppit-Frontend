'use client';

import {
  CategoryTodoSectionList,
  HabitStreakCard,
  UserGreeting,
} from '@/domains/home/ui';

import { TodoFormSheetProvider } from './contexts';

export const HomeScreen = () => {
  return (
    <TodoFormSheetProvider>
      <div className="pt-9 px-5 min-h-screen flex flex-col gap-5">
        <UserGreeting
          name="Alex"
          profileImage="https://picsum.photos/seed/alex/200/200"
        />
        <HabitStreakCard />
        <CategoryTodoSectionList />
      </div>
    </TodoFormSheetProvider>
  );
};
