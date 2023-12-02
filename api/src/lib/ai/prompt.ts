import { type zLang } from "types/lang";
import { type z } from "zod";

type PromptKind = "index" | "predict";
type PromptLang = Record<z.infer<typeof zLang>, string>;

export const prompt = {
  index: {
    "ja-jp": `
日本語で, 言葉を覚えたての子供が知っている程度の語彙で, 名詞をランダムに 3 つ挙げてください.
またそれぞれの単語について, その単語に関連する単語と関連しない単語をそれぞれ 5 つ挙げてください.

- 前の会話で出てきた単語を含まない
- 可能な限り常用漢字を使う
- すべての単語で, 重複しないようにする
- それぞれの要素数 3 を必ず守る
- 応答は説明や解説を含まず, 以下のような必ずパース可能で正しい JSON のみにする
- "emoji" フィールドには必ず日本語ではない絵文字 (\\u{10000}-\\u{10FFFF}) を含める

\`\`\`json
{
  "words": [
    {
      "target": { "emoji": "📒", "word": "単語1" },
      "related": [
        { "emoji": "📒", "word": "単語1の関連語1" },
        // ...
      ],
      "unrelated": [
        { "emoji": "📒", "word": "単語1の関連しない語1" },
        // ...
      ]
    },
    {
      "target": { "emoji": "📒", "word": "単語2" },
      "related": [
        { "emoji": "📒", "word": "単語2の関連語1" },
        // ...
      ],
      "unrelated": [
        { "emoji": "📒", "word": "単語2の関連しない語1" },
        // ...
      ]
    }
    // ...
  ]
}
\`\`\`
  `,
    "en-us": ` 
In English, please list 3 nouns at random with a vocabulary that a child who has just learned words knows.
Also, for each word, list 5 words related to that word and 5 words unrelated to it.
In addition, include the emoji related to each word.

- Do not include words that appeared in the previous conversation
- Make sure that there are no duplicates for all words
- Be sure to keep the number of elements 3 for each
- The response should contain no explanations or explanations, only JSON that is always parsable and correct as follows
- The "emoji" field must include an emoji (\\u{10000}-\\u{10FFFF}) that is not Japanese 

\`\`\`json
{
  "words": [
    {
      "target": { "emoji": "📒", "word": "word1" },
      "related": [
        { "emoji": "📒", "word": "word1 related1" },
        // ...
      ],
      "unrelated": [
        { "emoji": "📒", "word": "word1 unrelated1" },
        // ...
      ]
    },
    {
      "target": { "emoji": "📒", "word": "word2" },
      "related": [
        { "emoji": "📒", "word": "word2 related1" },
        // ...
      ],
      "unrelated": [
        { "emoji": "📒", "word": "word2 unrelated1" },
        // ...
      ]
    }
    // ...
  ]
}
\`\`\`
  `,
  },
  predict: {
    "ja-jp": `
日本語で, 言葉を覚えたての子供が知っている程度の語彙で, $a$ に関連する単語を1つ挙げてください.
さらに, それぞれ単語に関係する絵文字を含んでください.

- 可能な限り常用漢字を使う
- 同じ単語を含めない
- 応答は説明や解説を含まず, 以下のような必ずパース可能で正しい JSON のみにする
- "emoji" フィールドには必ず日本語ではない絵文字 (\\u{10000}-\\u{10FFFF}) を含める
    
\`\`\`json
{
  "words": {
    "predicted": {
      "emoji": "📒",
      "word": "単語"
    }
  }
}
\`\`\`
  `,
    "en-us": `
In English, name one word related to $a$ with the vocabulary of a child who has just learned the language.
In addition, include the emoji related to each word.

- Do not include the same word
- The response should contain no explanations or explanations, only JSON that is always parsable and correct as follows
- The "emoji" field must include an emoji (\\u{10000}-\\u{10FFFF}) that is not Japanese

\`\`\`json
{
  "words": {
    "predicted": {
      "emoji": "📒",
      "word": "word"
    }
  }
}
\`\`\`
    `,
  },
} as const satisfies Record<PromptKind, PromptLang>;
