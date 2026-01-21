export const CATEGORY_COLORS = [
  '#1c763c',
  '#2563eb',
  '#dc2626',
  '#ea580c',
  '#7c3aed',
] as const;

export type CategoryColor = (typeof CATEGORY_COLORS)[number];
