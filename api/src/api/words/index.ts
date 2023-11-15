import { askAI } from "lib/ai";
import { createHono } from "lib/constant";
import { extractJsonFromString } from "lib/extractor";

type Res = {
  words: string[];
};

export const words = createHono().get("/", async (ctx) => {
  const { response } = await askAI(ctx.env, [
    {
      role: "user",
      content: `List five nouns in **Japanese** that are known to a child who is just learning to speak.
      Never contain the same word or English word.
      The response must be a JSON object that contains an array of five words.
      {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "required": ["words"],
        "properties": {
          "words": {
              "type": "array",
              "items": {
                "type": "string"
              }
          }
        }
      }
      `,
    },
  ]);
  console.log(response);
  return ctx.jsonT(extractJsonFromString<Res>(response));
});
