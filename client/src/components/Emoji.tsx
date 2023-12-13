import { type ReactElement } from "react";
import { search, get } from "node-emoji";
import { styled as p } from "panda/jsx";

export function Emoji({ emoji }: { emoji: string }): ReactElement {
  const _emoji = get(emoji) ?? search(emoji).at(0)?.emoji ?? "";
  return <p.span className="emoji">{_emoji}</p.span>;
}
