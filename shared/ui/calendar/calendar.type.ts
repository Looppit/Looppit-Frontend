import { DayPicker } from "react-day-picker";

import { Button } from "../button";

export type DayPickerSingleProps = Omit<
  React.ComponentProps<typeof DayPicker>,
  'mode' | 'selected' | 'onSelect'
> & {
  mode: 'single';
  selected?: Date | undefined;
  onSelect?: (date: Date | undefined) => void;
};

export type CalendarProps = DayPickerSingleProps & {
  type: 'weekly' | 'monthly';
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
  SubDayComponent?: React.ReactNode;
};

export type MonthlyCalendarProps = DayPickerSingleProps & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
  SubDayComponent?: React.ReactNode;
};

export type WeeklyCalendarProps = DayPickerSingleProps & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
  SubDayComponent?: React.ReactNode;
};