import { useAtomValue } from "jotai";
import { type ReactElement } from "react";
import { styled as p } from "panda/jsx";
import { atomCharacterType } from "@/lib/store/ui";
import { type CharacterType } from "@/types/atom/ui";

type RubyProps = {
  rb: string;
  rt: string;
  override?: CharacterType;
};

export default function Ruby({ rb, rt, override }: RubyProps): ReactElement {
  const characterType = useAtomValue(atomCharacterType);
  const marginSide = rt.length > 2 ? 0.3 : 0;

  switch (override ?? characterType) {
    case "hiragana":
      return <p.span style={{ margin: `0 ${marginSide}rem` }}>{rt}</p.span>;
    case "kanji":
      return <p.span>{rb}</p.span>;
    case "ruby":
      return (
        <p.ruby>
          {rb}
          <p.rt
            display="block"
            fontSize="max(40%, 9pt)"
            opacity={0.6}
            textAlign="start"
            userSelect="none"
          >
            {rt}
          </p.rt>
        </p.ruby>
      );
    default:
      throw new Error(`Invalid characterType: ${characterType}`);
  }
}
