import { askBardWithJson } from "lib/bard";
import { createHono } from "lib/constant";
import { z } from "zod";

export const words = createHono().get("/", async (ctx) => {
  const prompt = `
  日本語で, 言葉を覚えたての子供が知っている程度の語彙で, 名詞を5つ挙げてください.
  同じ単語を含めないでください.  以下のような JSON 形式のみで応答してください.

  \`\`\`json
  {
    "words": [
      "単語1",
      "単語2",
      "単語3",
      "単語4",
      "単語5"
    ]
  }
  \`\`\`
  `;

  const zRes = z.object({
    words: z.array(z.string()),
  });

  const res = await askBardWithJson<z.infer<typeof zRes>>(ctx.env, prompt);

  return ctx.jsonT(zRes.parse(res));
});
