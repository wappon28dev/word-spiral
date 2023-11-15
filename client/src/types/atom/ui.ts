export const characterTypes = ["hiragana", "kanji", "ruby"] as const;
export type CharacterType = (typeof characterTypes)[number];
