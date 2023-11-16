"use client";

import { useEffect, type ReactElement } from "react";
import { styled as p } from "panda/jsx";
import Icon from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";
import useViewTransitionRouter from "@/hooks/useViewTransitionRouter";

const words = {
  words: [
    {
      word: "あかちゃん",
      related: ["ママ", "パパ", "おじいちゃん", "おばあちゃん", "お兄ちゃん"],
      unrelated: ["ボール", "犬", "猫", "りんご", "本"],
    },
    {
      word: "ボール",
      related: ["あかちゃん", "公園", "遊び", "蹴る", "投げる"],
      unrelated: ["ママ", "パパ", "おじいちゃん", "おばあちゃん", "りんご"],
    },
    {
      word: "犬",
      related: ["ボール", "散歩", "吠える", "尻尾", "毛"],
      unrelated: ["ママ", "パパ", "おじいちゃん", "おばあちゃん", "りんご"],
    },
    {
      word: "猫",
      related: ["ボール", "おもちゃ", "すねる", "毛", "ひげ"],
      unrelated: ["ママ", "パパ", "おじいちゃん", "おばあちゃん", "りんご"],
    },
    {
      word: "りんご",
      related: ["食べ物", "甘い", "酸っぱい", "丸い", "赤い"],
      unrelated: ["ママ", "パパ", "おじいちゃん", "おばあちゃん", "犬"],
    },
  ],
} as const;

export default function PagePlay(): ReactElement {
  // const words = useAtomValue(atomWords);
  const router = useViewTransitionRouter();

  useEffect(() => {
    if (words == null) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <p.div h="100%" w="100%">
      <p.main display="flex" h="100%" w="100%">
        <p.div bg="blue.100" flex="3">
          <p.h1 fontSize="3xl" fontWeight="900" p="20px" textAlign="center">
            目標単語
          </p.h1>
          <p.div
            display="flex"
            flexDir="column"
            gap="20px"
            m="0 auto"
            maxW="400px"
            overflowY="auto"
          >
            {words.words.map((entry) => (
              <p.p
                key={entry.word}
                _hover={{
                  cursor: "pointer",
                  bg: "gray.200",
                  "& > span:last-child": {
                    transform: "translateX(3px)",
                  },
                }}
                bg="white"
                border="2px solid gray"
                display="flex"
                fontSize="xl"
                justifyContent="space-between"
                m="0 auto"
                p="20px"
                rounded="20px"
                textAlign="center"
                transition="all 0.2s ease-in-out"
                w="100%"
              >
                <p.span m="0 auto" textAlign="center">
                  {entry.word}
                </p.span>
                <p.span transition="all 0.2s ease-in-out">
                  <Icon path={mdiChevronRight} size={1} />
                </p.span>
              </p.p>
            ))}
          </p.div>
        </p.div>
        <p.div bg="red.100" flex="5" />
      </p.main>
    </p.div>
  );
}
