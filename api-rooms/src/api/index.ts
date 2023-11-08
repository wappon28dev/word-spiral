import { zValidator } from "@hono/zod-validator";
import { createHono } from "lib/constant";
import { RoomsDB } from "repository/rooms";
import { zRoom } from "types/rooms";
import { z } from "zod";
import { cors } from "hono/cors";

export const v1 = createHono()
  .use("*", cors())
  .get("/", async (ctx) => {
    const _rooms = await new RoomsDB(ctx.env.ROOMS_DB).getAll();
    console.log(_rooms);

    return ctx.jsonT(z.array(zRoom).parse(_rooms));
  })

  .post(
    "/",
    zValidator(
      "json",
      z.object({
        user: z.string(),
      })
    ),
    async (ctx) => {
      const { user } = ctx.req.valid("json");
      const id = await new RoomsDB(ctx.env.ROOMS_DB).add(user);
      return ctx.json({ id });
    }
  )

  .put("/:id/member", async (ctx) => {});
