import { useState, type ReactElement } from "react";

import { styled as p } from "panda/jsx";
import { useAtomValue, useSetAtom } from "jotai";
import { atomWords, atomWordsSelection } from "@/lib/store/data";
import { CheckButton } from "../CheckButton";

export function TargetWordSelect(): ReactElement {
  const words = useAtomValue(atomWords);
  const [idx, setIdx] = useState<number>();

  const setWordSelection = useSetAtom(atomWordsSelection);

  if (words == null) {
    return <p.div />;
  }

  return (
    <>
      <p.h2 fontSize="3xl" fontWeight="900" p="20px" textAlign="center">
        目標単語
      </p.h2>
      <p.div
        display="flex"
        flexDir="column"
        gap="10px"
        m="0 auto"
        overflowY="auto"
        p="10px"
      >
        {words.words.map((entry, _idx) => (
          <CheckButton
            key={entry.target.word}
            emoji={entry.target.emoji}
            isChecked={_idx === idx}
            onClick={() => {
              if (_idx === idx) {
                setIdx(undefined);
                setWordSelection(undefined);
                return;
              }
              setIdx(_idx);
              setWordSelection({
                data: entry,
                predict: [],
              });
            }}
          >
            {entry.target.word}
          </CheckButton>
        ))}
      </p.div>
    </>
  );
}
