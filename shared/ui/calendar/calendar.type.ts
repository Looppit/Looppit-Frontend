import { DayPicker } from 'react-day-picker';

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
  SubDayComponent?: React.ReactNode;
};

export type MonthlyCalendarProps = DayPickerSingleProps & {
  SubDayComponent?: React.ReactNode;
};

export type WeeklyCalendarProps = DayPickerSingleProps & {
  SubDayComponent?: React.ReactNode;
};
