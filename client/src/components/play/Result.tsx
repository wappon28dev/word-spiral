import { useState, type ReactElement, useEffect } from "react";

import { styled as p } from "panda/jsx";
import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@mantine/core";
import Icon from "@mdi/react";
import { mdiArrowDown, mdiHeadSnowflake } from "@mdi/js";
import { atomActionStatus, atomWordsSelection } from "@/lib/store/data";
import { useWords } from "@/hooks/useWords";
import { CheckButton } from "../CheckButton";
import { requestWithActionStatus } from "@/lib/request";

export default function Result(): ReactElement {
  const wordsSelection = useAtomValue(atomWordsSelection);

  const { predict } = useWords();
  const [predictedWordList, setPredictedWordList] =
    useState<Awaited<ReturnType<typeof predict>>>();
  const setActionStatus = useSetAtom(atomActionStatus);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (wordsSelection?.predict?.length) {
      setPredictedWordList(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordsSelection?.predict?.length]);

  if (!wordsSelection?.predict?.length) {
    return <p.div />;
  }

  const predictWord = async (): Promise<void> => {
    await requestWithActionStatus({
      requestInfo: {
        from: "onClick",
        message: "predicting words",
        setActionStatus,
      },

      request: predict(wordsSelection.predict.map((v) => v.word)),

      onRequestBefore: () => {
        setIsLoading(true);
      },
      onSucceeded: (data) => {
        setPredictedWordList(data);
      },
      onRequestAfter: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <>
      <p.h2 fontSize="3xl" fontWeight="900" p="20px" textAlign="center">
        単語を選択
      </p.h2>
      <p.div p="10px">
        <p.div opacity={0.4} pointerEvents="none" zoom={0.6}>
          <p.div display="flex" justifyContent="center" minH="240px">
            {wordsSelection.predict.map((entry, _idx) => (
              <p.div
                // eslint-disable-next-line react/no-array-index-key
                key={_idx}
                alignItems="center"
                style={{
                  marginLeft: _idx === 0 ? 0 : -130,
                  marginTop: (_idx % 3) * 50,
                }}
                w="200px"
              >
                <CheckButton emoji={entry.emoji} isChecked={false}>
                  {entry.word}
                </CheckButton>
              </p.div>
            ))}
          </p.div>
        </p.div>

        <p.div
          alignItems="center"
          display="flex"
          flexDir="column"
          gap="10px"
          justifyContent="center"
          p="20px"
        >
          <p.div bg="gray.600" h="30px" p="10px 0" w="3px" />
          <Button
            leftIcon={<Icon path={mdiHeadSnowflake} size={1} />}
            loading={isLoading}
            onClick={predictWord}
            size="lg"
          >
            AI に予測させる
          </Button>
          <p.div color="gray.600" mt="-5px">
            <Icon path={mdiArrowDown} size={1.5} />
          </p.div>
        </p.div>
      </p.div>
      <p.div m="0 auto" w="200px">
        {(() => {
          if (predictedWordList == null) return <p.div />;
          const { emoji, word } = predictedWordList.words.predicted;
          return (
            <CheckButton emoji={emoji} isChecked={false}>
              {word}
            </CheckButton>
          );
        })()}
      </p.div>
    </>
  );
}
