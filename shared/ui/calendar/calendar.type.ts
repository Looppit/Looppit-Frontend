import { DayPicker, DayProps } from 'react-day-picker';

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
  SubDayComponent?: (props: { day: DayProps['day'] }) => React.ReactNode;
  onNavigate?: (date: Date) => void;
};

export type MonthlyCalendarProps = Omit<CalendarProps, 'type'>;

export type WeeklyCalendarProps = Omit<CalendarProps, 'type'>;
