'use client';

import {
  HabitStreakSection,
  HomeSheets,
  TodoSections,
  UserGreetingSection,
} from '@/domains/home/ui';

import { CalendarSection } from './ui/calendar-section';

export const HomeScreen = () => {
  return (
    <div className="pt-9 px-5 min-h-screen flex flex-col gap-5">
      <UserGreetingSection />
      <HabitStreakSection />
      <CalendarSection />
      <TodoSections />
      <HomeSheets />
    </div>
  );
};
