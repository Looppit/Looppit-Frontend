import { atom } from 'jotai';

import { SHEET_COMPONENTS } from '@/domains/home/ui';

type SheetPropsMap = {
  [K in keyof typeof SHEET_COMPONENTS]: React.ComponentProps<
    (typeof SHEET_COMPONENTS)[K]
  >['props'];
};

type SheetProps = {
  [K in keyof SheetPropsMap]: {
    type: K;
    props: SheetPropsMap[K];
  };
}[keyof SheetPropsMap];

export const sheetStateAtom = atom<SheetProps | null>(null);

export const openSheetAtom = atom(null, (get, set, sheet: SheetProps) => {
  set(sheetStateAtom, sheet);
});

export const closeSheetAtom = atom(null, (get, set) => {
  set(sheetStateAtom, null);
});
