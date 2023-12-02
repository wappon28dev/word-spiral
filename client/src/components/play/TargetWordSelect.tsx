import { type ReactElement } from "react";

import { styled as p } from "panda/jsx";
import { useAtom, useAtomValue } from "jotai";
import { Button } from "../Button";
import { atomWords, atomWordsSelection } from "@/lib/store/data";

export function TargetWordSelect(): ReactElement {
  const words = useAtomValue(atomWords);

  const [wordSelection, setWordSelection] = useAtom(atomWordsSelection);

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
        gap="20px"
        m="0 auto"
        maxW="400px"
        overflowY="auto"
      >
        {words.words.map((entry, idx) => (
          <Button
            key={entry.target.word}
            onClick={() => {
              setWordSelection({
                data: entry,
                predict: [],
              });
            }}
          >
            {entry.target.word}
          </Button>
        ))}
      </p.div>
    </>
  );
}
/* <p.h2 fontSize="3xl" fontWeight="900" p="20px" textAlign="center">
単語を選択
</p.h2>
{(() => {
if (wordSelection?.targetWord == null) return;
const selectedWordIdx = words.words.findIndex(
  ({ word }) => word === wordSelection.targetWord
);
return <WordSelect wordData={words.words[selectedWordIdx]} />;
})()} */
