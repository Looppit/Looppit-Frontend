import { atom, useAtomValue, useSetAtom } from "jotai";

export const tokenAtom = atom<string | null>(null);

export const useTokenAtomValue = () => useAtomValue(tokenAtom);

export const useSetTokenAtom = () => useSetAtom(tokenAtom);
