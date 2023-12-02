import { type InferResponseType, hc } from "hono/client";
import { useAtomValue } from "jotai";
import { type AppType } from "@api";
import { type HonoClient } from "@/types/client";
import { atomApiUrl } from "@/lib/store/data";
import { atomLang } from "@/lib/store/ui";

const defaultUrl = "http://localhost:8787";
export const getHonoClient = (url = defaultUrl): HonoClient => hc<AppType>(url);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useWords() {
  const apiUrl = useAtomValue(atomApiUrl);
  const lang = useAtomValue(atomLang);

  const client = getHonoClient(apiUrl);

  const _getWords = client.v1.words[":lang"].$get;
  async function getWords(): Promise<InferResponseType<typeof _getWords>> {
    const res = await _getWords({
      param: { lang },
    });

    return res.json();
  }

  async function getWordsMock(): Promise<Awaited<ReturnType<typeof getWords>>> {
    return {
      words: [
        {
          word: "あかちゃん",
          related: [
            "ママ",
            "パパ",
            "おじいちゃん",
            "おばあちゃん",
            "お兄ちゃん",
          ],
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
  }

  const getPredict = client.v1.words[":lang"].predict.$post;
  async function predict(
    relatedWords: string[]
  ): Promise<InferResponseType<typeof getPredict>> {
    const res = await getPredict({
      param: { lang },
      json: {
        words: {
          related: relatedWords,
        },
      },
    });

    return res.json();
  }

  return {
    getWords,
    getWordsMock,
    predict,
  };
}
