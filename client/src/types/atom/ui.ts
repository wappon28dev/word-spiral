import { type hotkeyGroupsData } from "@/lib/helpers/hotkey";

export const characterTypes = ["hiragana", "kanji", "ruby"] as const;
export type CharacterType = (typeof characterTypes)[number];

export type HotkeyGroups = Array<keyof typeof hotkeyGroupsData>;
export type HotkeyGroup = HotkeyGroups[number];
