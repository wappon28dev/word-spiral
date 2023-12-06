import { useState, type ReactElement } from "react";

import { styled as p } from "panda/jsx";
import { useAtomValue } from "jotai";
import { Button } from "@mantine/core";
import { atomWordsSelection } from "@/lib/store/data";
import { useWords } from "@/hooks/useWords";

export default function Result(): ReactElement {
  const wordsSelection = useAtomValue(atomWordsSelection);
  const { predict } = useWords();
  const [predictedWordList, setPredictedWordList] =
    useState<Awaited<ReturnType<typeof predict>>>();

  if (wordsSelection?.predict == null) return <p.div />;

  const predictWord = async (): Promise<void> => {
    setPredictedWordList(await predict(wordsSelection.predict));
  };

  return (
    <>
      <p.h2 fontSize="3xl" fontWeight="900" p="20px" textAlign="center">
        単語を選択
      </p.h2>
      <p.div p="10px">
        {wordsSelection?.data.target.word}

        <Button
          onClick={() => {
            void predictWord();
          }}
          variant="filled"
        >
          predict
        </Button>
        <p.div>{predictedWordList?.words.predicted.word ?? ""}</p.div>
        <p.div>{predictedWordList?.words.predicted.emoji ?? ""}</p.div>
      </p.div>
    </>
  );
}
