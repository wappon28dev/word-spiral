import { nprogress } from "@mantine/nprogress";
import { atom, type useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { type HotkeyGroups, type CharacterType } from "@/types/atom/ui";
import { getLocalStorageKey } from "../local-storage";

export const atomIsLoading = atom(true);
export function loadingStart(
  setIsLoading: ReturnType<typeof useSetAtom>
): void {
  setIsLoading(true);
  nprogress.reset();
  nprogress.set(0.5);
  nprogress.start();
}

export function loadingComplete(
  setIsLoading: ReturnType<typeof useSetAtom>
): void {
  setIsLoading(false);
  nprogress.complete();
}

export const atomCharacterType = atomWithStorage<CharacterType>(
  getLocalStorageKey("characterType"),
  "ruby"
);

export const atomHotkeyGroups = atomWithStorage<HotkeyGroups>(
  getLocalStorageKey("hotkeyGroups"),
  ["upDown", "enter", "space", "leftRight"]
);
