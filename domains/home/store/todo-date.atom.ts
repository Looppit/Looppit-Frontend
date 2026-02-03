import { format } from 'date-fns';
import { atom } from 'jotai';

export const todoDateAtom = atom<Date>(new Date());

export const todoYearMonthAtom = atom((get) =>
  format(get(todoDateAtom), 'yyyy-MM'),
);
