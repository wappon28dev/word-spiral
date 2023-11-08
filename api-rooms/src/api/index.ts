import { zValidator } from "@hono/zod-validator";
import { createHono } from "lib/constant";
import { RoomDB, RoomsDB } from "repository/rooms";
import { zRoom } from "types/rooms";
import { z } from "zod";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";

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
        user: z.object({
          name: z.string(),
        }),
      })
    ),
    async (ctx) => {
      const { user } = ctx.req.valid("json");
      const { userId, roomId } = await new RoomsDB(ctx.env.ROOMS_DB).addFirst(
        user
      );

      const scheme = z.object({
        roomId: z.number(),
        userId: z.number(),
      });

      return ctx.json(scheme.parse({ roomId, userId }));
    }
  )

  .use("/:id/*", (ctx, next) => {
    const _roomId = ctx.req.param("id");

    const zRoomId = z.preprocess((v) => Number(v), z.number().positive());
    if (!zRoomId.safeParse(_roomId).success) {
      throw new HTTPException(400, {
        message: "Invalid room id",
      });
    }

    return next();
  })

  .put(
    "/:id/user",
    zValidator(
      "json",
      z.object({
        user: z.object({
          name: z.string(),
        }),
      })
    ),
    async (ctx) => {
      const roomId = Number(ctx.req.param("id"));
      const { user } = ctx.req.valid("json");

      const { userId } = await new RoomDB(ctx.env.ROOMS_DB, roomId).addRoomUser(
        {
          name: user.name,
        }
      );

      const res = { userId };
      const zRes = z.object({ userId: z.number() });

      return ctx.json(zRes.parse(res));
    }
  )

  .put(
    "/:id/status",
    zValidator(
      "json",
      z.object({
        status: zRoom.shape.status,
      })
    ),
    async (ctx) => {
      const roomId = Number(ctx.req.param("id"));
      const { status } = ctx.req.valid("json");

      await new RoomDB(ctx.env.ROOMS_DB, roomId).updateStatus(status);
    }
  );
