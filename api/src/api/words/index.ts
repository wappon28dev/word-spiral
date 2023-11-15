import { zValidator } from "@hono/zod-validator";
import { askBardWithJson } from "lib/ai/bard";
import { createHono } from "lib/constant";
import { prompt } from "lib/ai/prompt";
import { zLang } from "types/lang";
import { z } from "zod";

export const words = createHono()
  .get(
    "/:lang",
    zValidator(
      "param",
      z.object({
        lang: zLang,
      })
    ),
    async (ctx) => {
      const { lang } = ctx.req.valid("param");
      const req = prompt.index[lang];

      const zRes = z.object({
        words: z
          .array(
            z.object({
              word: z.string(),
              related: z.array(z.string()).length(5),
              unrelated: z.array(z.string()).length(5),
            })
          )
          .length(5),
      });
      const res = await askBardWithJson<z.infer<typeof zRes>>(ctx.env, req);

      return ctx.jsonT(zRes.parse(res.json));
    }
  )

  .post(
    "/:lang/predict",
    zValidator(
      "param",
      z.object({
        lang: zLang,
      })
    ),
    zValidator(
      "json",
      z.object({
        words: z.object({
          related: z.array(z.string()),
        }),
      })
    ),
    async (ctx) => {
      const {
        words: { related: relatedWords },
      } = ctx.req.valid("json");
      const { lang } = ctx.req.valid("param");
      const req = prompt.predict[lang].replace(
        "$a$",
        `[${relatedWords.join(", ")}]`
      );

      const zRes = z.object({
        words: z.object({
          predicted: z.string(),
        }),
      });
      const res = await askBardWithJson<z.infer<typeof zRes>>(ctx.env, req);

      return ctx.jsonT(zRes.parse(res.json));
    }
  );
