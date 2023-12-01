import { useState, type ReactElement, useEffect } from "react";
import { styled as p } from "panda/jsx";
import { type Words } from "@/lib/store/data";
import { type ElementType } from "@/lib/utils";
import { CheckButton } from "./CheckButton";

export function WordSelect({
  wordData,
}: {
  wordData: ElementType<Words["words"]>;
}): ReactElement {
  const [selectedIdx, setSelectedIdx] = useState<number[]>([]);
  const [wordDataArr, setWordDataArr] = useState<string[]>([]);

  const range = 9;
  const { word: targetWord } = wordData;

  useEffect(() => {
    const { related, unrelated } = wordData;
    const arr = [...related, ...unrelated];
    setWordDataArr(arr.sort(() => Math.random() - 0.5).slice(0, range));
  }, [wordData]);

  return (
    <p.div p="20px">
      {targetWord}
      <p.div display="grid" gap="20px" gridTemplateColumns="repeat(3, 1fr)">
        {wordDataArr.map((word, idx) => (
          <CheckButton
            key={word}
            isChecked={selectedIdx.includes(idx)}
            onClick={() => {
              if (selectedIdx.includes(idx)) {
                setSelectedIdx(selectedIdx.filter((i) => i !== idx));
              } else {
                setSelectedIdx([...selectedIdx, idx]);
              }
            }}
          >
            {word}
          </CheckButton>
        ))}
      </p.div>
    </p.div>
  );
}
