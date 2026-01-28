'use client';

import { useAtomValue, useSetAtom } from 'jotai';

import { SHEET_TYPE } from '@/domains/home/constants';
import {
  sheetStateAtom,
  closeSheetAtom,
} from '@/domains/home/store/sheet.atom';
import {
  TodoActionsSheet,
  TodoDeleteSheet,
  TodoFormSheet,
} from '@/domains/home/ui/sheets';

export const SHEET_COMPONENTS = {
  [SHEET_TYPE.TODO_FORM]: TodoFormSheet,
  [SHEET_TYPE.TODO_ACTIONS]: TodoActionsSheet,
  [SHEET_TYPE.TODO_DELETE]: TodoDeleteSheet,
} as const;

export const HomeSheets = () => {
  const sheetState = useAtomValue(sheetStateAtom);
  const closeSheet = useSetAtom(closeSheetAtom);

  if (!sheetState) {
    return null;
  }

  const Component = SHEET_COMPONENTS[sheetState.type] as React.ComponentType<{
    props: typeof sheetState.props;
    onClose: () => void;
  }>;

  return <Component props={sheetState.props} onClose={closeSheet} />;
};
