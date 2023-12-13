import { type zLang } from "types/lang";
import { type z } from "zod";

type PromptKind = "index" | "predict";
type PromptLang = Record<z.infer<typeof zLang>, string>;

export const prompt = {
  index: {
    "ja-jp": `
日本語で, 言葉を覚えたての子供が知っている程度の語彙で, ジャンルを示す名詞をランダムに 3 つ挙げてください.
またそれぞれの単語について, その単語の要素を示す名詞と関連しない名詞をそれぞれ 5 つ挙げてください.

- 前の会話で出てきた単語を含まない
- 可能な限り常用漢字を使う
- すべての単語で, 重複しないようにする
- 応答は説明や解説を含まず, 以下のような必ずパース可能で正しい JSON のみにする
- "emoji" フィールドには必ず存在する Unicode Emoji Shortcodes を含める (例: \`cat\`)

\`\`\`json
{
  "words": [
    {
      "target": { "emoji": "grinning", "word": "単語1" },
      "related": [
        { "emoji": "apple", "word": "単語1の関連語1" },
        // ...
      ],
      "unrelated": [
        { "emoji": "cat", "word": "単語1の関連しない語1" },
        // ...
      ]
    },
    {
      "target": { "emoji": "pencil", "word": "単語2" },
      "related": [
        { "emoji": "basketball", "word": "単語2の関連語1" },
        // ...
      ],
      "unrelated": [
        { "emoji": "tada", "word": "単語2の関連しない語1" },
        // ...
      ]
    }
    // ...
  ]
}
\`\`\`
  `,
    "en-us": ` 
List three random nouns in English that indicate genres with the vocabulary of a child who has just learned the language.
For each word, list five nouns that indicate elements of the word and five unrelated nouns.

- Do not include words that appeared in the previous conversation
- Make sure that there are no duplicates for all words
- The response should contain no explanations or explanations, only JSON that is always parsable and correct as follows
- "emoji" field must include Unicode Emoji Shortcodes present (example: \`cat\`)

\`\`\`json
{
  "words": [
    {
      "target": { "emoji": "grinning", "word": "word1" },
      "related": [
        { "emoji": "apple", "word": "word1 related word1" },
        // ...
      ],
      "unrelated": [
        { "emoji": "cat", "word": "word1 unrelated word1" },
        // ...
      ]
    },
    {
      "target": { "emoji": "pencil", "word": "word2" },
      "related": [
        { "emoji": "basketball", "word": "word2 related word1" },
        // ...
      ],
      "unrelated": [
        { "emoji": "tada", "word": "word2 unrelated word1" },
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
日本語で, 言葉を覚えたての子供が知っている程度の語彙で, $a$ に内包する単語を1つ挙げてください.
さらに, それぞれ単語に関係する絵文字を含んでください.

- 可能な限り常用漢字を使う
- 同じ単語を含めない
- 応答は説明や解説を含まず, 以下のような必ずパース可能で正しい JSON のみにする
- "emoji" フィールドには必ず存在する Unicode Emoji Shortcodes を含める (例: \`cat\`)
    
\`\`\`json
{
  "words": {
    "predicted": {
      "emoji": "grinning",
      "word": "単語"
    }
  }
}
\`\`\`
  `,
    "en-us": `
List one word in English that is familiar to a child who has just learned to speak the language and that is enclosed in $a$.
In addition, please include a pictograph related to each word.

- Do not include the same word
- The response should contain no explanations or explanations, only JSON that is always parsable and correct as follows
- "emoji" field must include Unicode Emoji Shortcodes present (example: \`cat\`)

\`\`\`json
{
  "words": {
    "predicted": {
      "emoji": "grinning",
      "word": "word"
    }
  }
}
\`\`\`
    `,
  },
} as const satisfies Record<PromptKind, PromptLang>;
