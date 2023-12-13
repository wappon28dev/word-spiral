import { useState, type ReactElement, useEffect } from "react";
import { styled as p } from "panda/jsx";
import { useAtom, useAtomValue } from "jotai";
import { type WordData } from "types/word";
import { atomWords, atomWordsSelection } from "@/lib/store/data";
import { CheckButton } from "../CheckButton";
import Ruby from "../Ruby";
import { Emoji } from "../Emoji";

export function PredictWordSelect(): ReactElement {
  const word = useAtomValue(atomWords);
  const [wordSelection, setWordSelection] = useAtom(atomWordsSelection);
  const [wordDataArr, setWordDataArr] = useState<WordData[]>([]);

  const range = 9;

  useEffect(() => {
    if (word == null || wordSelection?.data == null) return;
    const { related, unrelated } = wordSelection.data;
    const arr = [...related, ...unrelated];
    setWordDataArr(arr.sort(() => Math.random() - 0.5).slice(0, range));
  }, [word, wordSelection?.data]);

  if (wordSelection == null) {
    return <p.div />;
  }

  const { data: target, predict } = wordSelection;

  return (
    <>
      <p.h2 fontSize="2xl" fontWeight="900" p="20px" textAlign="center">
        “{wordSelection.data.target.word}{" "}
        <Emoji emoji={wordSelection.data.target.emoji} />” に
        <Ruby rb="近" rt="ちか" />い
        <Ruby rb="単語" rt="たんご" />を<Ruby rb="選" rt="えら" />
        ぼう！
      </p.h2>

      <p.div
        display="grid"
        gap="10px"
        gridTemplateColumns="repeat(3, 1fr)"
        p="10px"
      >
        {wordDataArr.map((_data) => (
          <CheckButton
            key={_data.word}
            emoji={_data.emoji}
            isChecked={predict.includes(_data)}
            onClick={() => {
              setWordSelection(
                (() => {
                  if (predict.includes(_data)) {
                    return {
                      data: target,
                      predict: predict.filter((v) => v !== _data),
                    };
                  }
                  return {
                    data: target,
                    predict: [...predict, _data],
                  };
                })()
              );
            }}
          >
            {_data.word}
          </CheckButton>
        ))}
      </p.div>
    </>
  );
}
