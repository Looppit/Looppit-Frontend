'use client';

import * as React from 'react';
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
} from 'react-day-picker';

import { ko } from 'react-day-picker/locale';

import { useSwipe } from '@/shared/hooks';
import { Button, buttonVariants } from '@/shared/ui/button';
import { cn } from '@/shared/utils';

import { useWeeklyCalendar } from './calendar.hooks';
import { WeeklyCalendarProps } from './calendar.type';

function WeeklyCalendar({
  className,
  classNames,
  captionLayout = 'label',
  formatters,
  components,
  SubDayComponent,
  selected,
  onSelect,
  ...props
}: WeeklyCalendarProps) {
  const defaultClassNames = getDefaultClassNames();
  const {
    month,
    setMonth,
    isNotCurrentWeek,
    onClickPreviousWeek,
    onClickNextWeek,
  } = useWeeklyCalendar();

  const { swipeAreaRef } = useSwipe({
    onSwipe: (direction) => {
      if (direction === 'left') {
        onClickPreviousWeek();
      } else {
        onClickNextWeek();
      }
    },
  });

  return (
    <div className="w-full" ref={swipeAreaRef}>
      <DayPicker
        selected={selected}
        onSelect={onSelect}
        locale={ko}
        hideNavigation
        showOutsideDays={true}
        month={month}
        onMonthChange={setMonth}
        hidden={isNotCurrentWeek}
        className={cn(
          'w-full max-w-md bg-background group/calendar p-3 [--cell-size:--spacing(8)] in-data-[slot=card-content]:bg-transparentt in-data-[slot=popover-content]:bg-transparent',
          String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
          String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
          className,
        )}
        captionLayout={captionLayout}
        formatters={{
          formatMonthDropdown: (date) =>
            date.toLocaleString('default', { month: 'short' }),
          ...formatters,
        }}
        classNames={{
          root: cn('w-fit', defaultClassNames.root),
          months: cn(
            'flex gap-4 flex-col md:flex-row relative',
            defaultClassNames.months,
          ),
          month: cn('flex flex-col w-full gap-4', defaultClassNames.month),
          nav: cn(
            'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
            defaultClassNames.nav,
          ),
          button_previous: cn(
            buttonVariants({ variant: 'ghost' }),
            'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
            'w-10 h-10 flex items-center justify-center rounded-full text-secondary hover:text-white transition-colors',
            defaultClassNames.button_previous,
          ),
          button_next: cn(
            buttonVariants({ variant: 'ghost' }),
            'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
            'w-10 h-10 flex items-center justify-center rounded-full text-secondary hover:text-white transition-colors',
            defaultClassNames.button_next,
          ),
          month_caption: cn(
            'flex items-center justify-start h-(--cell-size) w-full pl-[calc(var(--cell-size)/2)] pr-(--cell-size)',
            defaultClassNames.month_caption,
          ),
          dropdowns: cn(
            'w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5',
            defaultClassNames.dropdowns,
          ),
          dropdown_root: cn(
            'relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md',
            defaultClassNames.dropdown_root,
          ),
          dropdown: cn(
            'absolute bg-popover inset-0 opacity-0',
            defaultClassNames.dropdown,
          ),
          caption_label: cn(
            'select-none font-bold text-white',
            captionLayout === 'label'
              ? 'text-base'
              : 'rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5',
            defaultClassNames.caption_label,
          ),
          table: 'w-full border-collapse',
          weekdays: cn('flex', defaultClassNames.weekdays),
          weekday: cn(
            'text-secondary opacity-50 font-bold',
            'rounded-md flex-1 typography-caption-bold select-none',
            defaultClassNames.weekday,
          ),
          week: cn('flex w-full', defaultClassNames.week),
          week_number_header: cn(
            'select-none w-(--cell-size)',
            defaultClassNames.week_number_header,
          ),
          week_number: cn(
            'text-[0.8rem] select-none text-muted-foreground',
            defaultClassNames.week_number,
          ),
          day: cn(
            'relative w-full h-full p-0 text-center  group/day aspect-square select-none ',
            'flex gap-[2px] flex-col items-center justify-center',
            'data-[hidden=true]:hidden',
            props.showWeekNumber
              ? 'nth-2:[data-selected=true]_button:rounded-l-md'
              : 'nth-1:[data-selected=true]_button:rounded-l-md',
            props.mode === 'single'
              ? 'nth-last-1:[data-selected=true]_button:rounded-full nth-1:[data-selected=true]_button:rounded-full'
              : 'nth-last-1:[data-selected=true]_button:rounded-r-md',
            defaultClassNames.day,
          ),
          range_start: cn(
            'rounded-l-md bg-accent',
            defaultClassNames.range_start,
          ),
          range_middle: cn('rounded-none', defaultClassNames.range_middle),
          range_end: cn('rounded-r-md bg-accent', defaultClassNames.range_end),
          today: cn(
            'data-[selected=true]:rounded-none',
            defaultClassNames.today,
          ),
          outside: cn(
            'text-muted-foreground aria-selected:text-muted-foreground',
            defaultClassNames.outside,
          ),
          disabled: cn(
            'text-muted-foreground opacity-50',
            defaultClassNames.disabled,
          ),
          hidden: cn('invisible', defaultClassNames.hidden),
          ...classNames,
        }}
        components={{
          Root: ({ className, rootRef, ...props }) => {
            return (
              <div
                data-slot="calendar"
                ref={rootRef}
                className={cn(className)}
                {...props}
              />
            );
          },
          DayButton: CalendarDayButton,
          WeekNumber: ({ children, ...props }) => {
            return (
              <td {...props}>
                <div className="flex size-(--cell-size) items-center justify-center text-center">
                  {children}
                </div>
              </td>
            );
          },
          Day: ({ children, ...props }) => {
            return (
              <div {...props}>
                <button
                  className={cn(
                    'cursor-pointer w-8 h-8 flex items-center justify-center rounded-full text-[14px] font-medium text-secondary hover:bg-white/5 in-data-[selected=true]:hover:bg-primary',
                    'data-[today=true]:text-primary data-[today=true]:opacity-100',
                    defaultClassNames.day,
                  )}
                >
                  {children}
                </button>
                {SubDayComponent}
              </div>
            );
          },
          ...components,
        }}
        {...props}
      />
    </div>
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'text-secondary opacity-70 p-0 flex cursor-pointer aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-bold',
        'in-data-[today=true]:text-primary in-data-[today=true]:opacity-100',
        'data-[selected-single=true]:opacity-100 data-[selected-single=true]:text-white data-[selected-single=true]:bg-primary data-[selected-single=true]:rounded-full',
        'data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-middle=true]:rounded-none',
        // 'data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md',
        // 'data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md',
        // 'group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px]',
        'dark:hover:text-accent-foreground enabled:hover:scale-100 transition-none',
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { WeeklyCalendar, CalendarDayButton };
