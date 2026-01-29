export const CATEGORY_ICONS = [
  'ic_calendar_month',
  'ic_category_fill',
  'ic_check',
  'ic_delete',
  'ic_close',
  'ic_home',
  'ic_local_fire_department_fill',
  'ic_schedule',
  'ic_more_horiz',
  'ic_add',
] as const;

export type CategoryIconName = (typeof CATEGORY_ICONS)[number];
