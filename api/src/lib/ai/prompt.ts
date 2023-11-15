import { type zLang } from "types/lang";
import { type z } from "zod";

type PromptKind = "index" | "predict";
type PromptLang = Record<z.infer<typeof zLang>, string>;

export const prompt = {
  index: {
    "ja-jp": `
今までの会話をすべて忘れてください.
日本語で, 言葉を覚えたての子供が知っている程度の語彙で, 名詞をランダムに 5 つ挙げてください.
またそれぞれの単語について, その単語に関連する単語と関連しない単語をそれぞれ 5 つ挙げてください.

- 前の会話で出てきた単語を含まない
- 可能な限り常用漢字を使う
- すべての単語で, 重複しないようにする
- それぞれの要素数 5 を必ず守る
- 応答は説明や解説を含まず, 以下のような必ずパース可能で正しい JSON のみにする

\`\`\`json
{
  "words": [
    {
      "word": "単語1",
      "related": [
        "単語1の関連語1", "単語1の関連語2", "単語1の関連語3", "単語1の関連語4", "単語1の関連語5"
      ],
      "unrelated": [
        "単語1の関連しない語1", "単語1の関連しない語2", "単語1の関連しない語3", "単語1の関連しない語4", "単語1の関連しない語5"
      ]
    },
    {
      "word": "単語2",
      "related": [
        "単語2の関連語1", "単語2の関連語2", "単語2の関連語3", "単語2の関連語4", "単語2の関連語5"
      ],
      "unrelated": [
        "単語2の関連しない語1", "単語2の関連しない語2", "単語2の関連しない語3", "単語2の関連しない語4", "単語2の関連しない語5"
      ]
    },
    // ...
  ]
}
\`\`\`
  `,
    "en-us": ` 
Forget all the previous conversations.
In English, please list 5 nouns at random with a vocabulary that a child who has just learned words knows.
Also, for each word, list 5 words related to that word and 5 words unrelated to it.

- Do not include words that appeared in the previous conversation
- Make sure that there are no duplicates for all words
- Be sure to keep the number of elements 5 for each
- The response should contain no explanations or explanations, only JSON that is always parsable and correct as follows

\`\`\`json
{
  "words": [
    {
      "word": "word1",
      "related": [
        "word1 related word1", "word1 related word2", "word1 related word3", "word1 related word4", "word1 related word5"
      ],
      "unrelated": [
        "word1 unrelated word1", "word1 unrelated word2", "word1 unrelated word3", "word1 unrelated word4", "word1 unrelated word5"
      ]
    },
    {
      "word": "word2",
      "related": [
        "word2 related word1", "word2 related word2", "word2 related word3", "word2 related word4", "word2 related word5"
      ],
      "unrelated": [
        "word2 unrelated word1", "word2 unrelated word2", "word2 unrelated word3", "word2 unrelated word4", "word2 unrelated word5"
      ]
    },
    // ...
  ]
}
\`\`\`
  `,
  },
  predict: {
    "ja-jp": `
今までの会話をすべて忘れてください.
日本語で, 言葉を覚えたての子供が知っている程度の語彙で, $a$ に関連する単語を1つ挙げてください.

- 可能な限り常用漢字を使う
- 同じ単語を含めない
- 応答は説明や解説を含まず, 以下のような必ずパース可能で正しい JSON のみにする
    
\`\`\`json
{
  "words": {
    "predicted": "単語"
  }
}
\`\`\`
  `,
    "en-us": `
Forget all the previous conversations.
In English, name one word related to $a$ with the vocabulary of a child who has just learned the language.

- Do not include the same word
- The response should contain no explanations or explanations, only JSON that is always parsable and correct as follows

\`\`\`json
{
  "words": {
    "predicted": "word"
  }
}
\`\`\`
    `,
  },
} as const satisfies Record<PromptKind, PromptLang>;
