import { useState, type ReactElement, useEffect } from "react";
import { styled as p } from "panda/jsx";
import { Button } from "@mantine/core";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";
import { useAtom, useAtomValue } from "jotai";
import { type WordData } from "types/word";
import { atomWords, atomWordsSelection } from "@/lib/store/data";
import { CheckButton } from "../CheckButton";

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
      <p.h2 fontSize="3xl" fontWeight="900" p="20px" textAlign="center">
        目標単語
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
            isChecked={predict.includes(_data.word)}
            onClick={() => {
              setWordSelection(
                (() => {
                  if (predict.includes(_data.word)) {
                    return {
                      data: target,
                      predict: predict.filter((w) => w !== _data.word),
                    };
                  }
                  return {
                    data: target,
                    predict: [...predict, _data.word],
                  };
                })()
              );
            }}
          >
            {_data.word}
          </CheckButton>
        ))}
      </p.div>
      <p.div p="20px" textAlign="center">
        <Button rightIcon={<Icon path={mdiArrowRight} size={1} />} size="lg">
          続ける
        </Button>
      </p.div>
    </>
  );
}