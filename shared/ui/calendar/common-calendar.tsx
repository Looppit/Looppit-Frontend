import * as React from 'react';
import {
  getDefaultClassNames,
  MonthGrid,
  Week,
  Weekday,
  Weekdays,
  Weeks,
} from 'react-day-picker';

import { cn } from '@/shared/utils';

function CalendarRoot({
  className,
  rootRef,
  ...props
}: {
  className?: string;
  rootRef?: React.Ref<HTMLDivElement>;
} & React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      data-slot="calendar"
      ref={rootRef}
      className={cn(className)}
      {...props}
    />
  );
}

function CalendarMonthGrid({
  children,
  ...props
}: React.ComponentProps<typeof MonthGrid> & {
  className?: string;
}) {
  const defaultClassNames = getDefaultClassNames();
  return (
    <div className={cn(defaultClassNames.month_grid)} {...props}>
      {children}
    </div>
  );
}

function CalendarWeekdays({
  children,
  ...props
}: React.ComponentProps<typeof Weekdays> & {
  className?: string;
}) {
  const defaultClassNames = getDefaultClassNames();
  return (
    <div className={cn(defaultClassNames.weekdays)} {...props}>
      {children}
    </div>
  );
}

function CalendarWeekday({
  children,
  ...props
}: React.ComponentProps<typeof Weekday> & {
  className?: string;
}) {
  const defaultClassNames = getDefaultClassNames();
  return (
    <div className={cn(defaultClassNames.weekday)} {...props}>
      {children}
    </div>
  );
}

function CalendarWeeks({
  children,
  ...props
}: React.ComponentProps<typeof Weeks> & {
  className?: string;
}) {
  const defaultClassNames = getDefaultClassNames();
  return (
    <div className={cn('flex w-full', defaultClassNames.weeks)} {...props}>
      {children}
    </div>
  );
}

function CalendarWeek({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Week> & {
  className?: string;
}) {
  const defaultClassNames = getDefaultClassNames();
  return (
    <div
      className={cn('flex w-full', defaultClassNames.week, className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CalendarWeekNumber({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div {...props}>
      <div className="flex size-(--cell-size) items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}

export {
  CalendarRoot,
  CalendarMonthGrid,
  CalendarWeekdays,
  CalendarWeekday,
  CalendarWeeks,
  CalendarWeek,
  CalendarWeekNumber,
};
