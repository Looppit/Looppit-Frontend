'use client';

import {
  HabitStreakCard,
  HomeSheets,
  TodoSections,
  UserGreeting,
} from '@/domains/home/ui';

export const HomeScreen = () => {
  return (
    <div className="pt-9 px-5 min-h-screen flex flex-col gap-5">
      <UserGreeting
        name="Alex"
        profileImage="https://picsum.photos/seed/alex/200/200"
      />
      <HabitStreakCard />
      <TodoSections />
      <HomeSheets />
    </div>
  );
};
