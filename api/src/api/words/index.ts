import { zValidator } from "@hono/zod-validator";
import { askBardWithJson } from "lib/ai/bard";
import { createHono } from "lib/constant";
import { prompt } from "lib/ai/prompt";
import { zLang } from "types/lang";
import { z } from "zod";
import { _zWordData } from "types/word";

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
              target: _zWordData,
              related: z.array(_zWordData).length(5),
              unrelated: z.array(_zWordData).length(5),
            })
          )
          .length(3),
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
          predicted: _zWordData,
        }),
      });
      const res = await askBardWithJson<z.infer<typeof zRes>>(ctx.env, req);

      return ctx.jsonT(zRes.parse(res.json));
    }
  );
