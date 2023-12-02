import { useState, type ReactElement, useEffect } from "react";
import { styled as p } from "panda/jsx";
import { Button } from "@mantine/core";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";
import { useAtom, useAtomValue } from "jotai";
import { atomWords, atomWordsSelection } from "@/lib/store/data";
import { CheckButton } from "../CheckButton";

export function PredictWordSelect(): ReactElement {
  const word = useAtomValue(atomWords);
  const [wordSelection, setWordSelection] = useAtom(atomWordsSelection);
  const [wordDataArr, setWordDataArr] = useState<string[]>([]);

  const range = 9;

  useEffect(() => {
    if (word == null || wordSelection?.target == null) return;
    const { related, unrelated } = wordSelection.target;
    const arr = [...related, ...unrelated];
    setWordDataArr(arr.sort(() => Math.random() - 0.5).slice(0, range));
  }, [word, wordSelection?.target]);

  if (wordSelection == null) {
    return <p.div />;
  }

  const { target, predict } = wordSelection;

  return (
    <p.div p="20px">
      <p.div display="grid" gap="20px" gridTemplateColumns="repeat(3, 1fr)">
        {wordDataArr.map((_word) => (
          <CheckButton
            key={_word}
            isChecked={predict.includes(_word)}
            onClick={() => {
              setWordSelection(
                (() => {
                  if (predict.includes(_word)) {
                    return {
                      target,
                      predict: predict.filter((w) => w !== _word),
                    };
                  }
                  return {
                    target,
                    predict: [...predict, _word],
                  };
                })()
              );
            }}
          >
            {_word}
          </CheckButton>
        ))}
      </p.div>
      <p.div p="20px" textAlign="center">
        <Button rightIcon={<Icon path={mdiArrowRight} size={1} />} size="lg">
          続ける
        </Button>
      </p.div>
    </p.div>
  );
}
