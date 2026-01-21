'use client';

import {
  HabitStreakCard,
  TodoActionsSheetContainer,
  TodoDeleteSheetContainer,
  TodoFormSheetContainer,
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
      {/* Sheet */}
      <TodoFormSheetContainer />
      <TodoActionsSheetContainer />
      <TodoDeleteSheetContainer />
    </div>
  );
};
