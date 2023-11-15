import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { createHono } from "lib/constant";
import { RoomsDB, RoomDB } from "repository/rooms";
import { UserDB, UsersDB } from "repository/users";
import { zRoom } from "types/rooms";
import { zUserReq } from "types/user";
import { z } from "zod";

export const rooms = createHono()
  .get("/", async (ctx) => {
    const _rooms = await new RoomsDB(ctx.env.ROOMS_DB).getAll();

    const zRes = z.array(zRoom);

    return ctx.jsonT(zRes.parse(_rooms));
  })

  .post("/", zValidator("json", zUserReq), async (ctx) => {
    const { name } = ctx.req.valid("json");

    const userId = await new UsersDB(ctx.env.ROOMS_DB).create({
      name,
    });
    const roomId = await new RoomsDB(ctx.env.ROOMS_DB).create(userId);
    await new UserDB(ctx.env.ROOMS_DB, userId).setRoomId(roomId);

    const res = { userId, roomId };
    const zRes = z.object({
      roomId: z.number(),
      userId: z.number(),
    });

    return ctx.jsonT(zRes.parse(res), 201);
  })

  .use("/:id/*", async (ctx, next) => {
    const _roomId = ctx.req.param("id");

    const zRoomId = z.preprocess((v) => Number(v), z.number().positive());
    if (!zRoomId.safeParse(_roomId).success) {
      throw new HTTPException(400, {
        message: "Invalid room id",
      });
    }

    const roomId = zRoomId.parse(_roomId);
    const exists = await new RoomDB(ctx.env.ROOMS_DB, roomId).exists();
    console.log(exists ? "exists" : "not exists");
    if (!exists) {
      throw new HTTPException(404, {
        message: "Room not found",
      });
    }

    await next();
  })

  .get("/:id", async (ctx) => {
    const roomId = Number(ctx.req.param("id"));
    const room = await new RoomDB(ctx.env.ROOMS_DB, roomId).get();

    return ctx.jsonT(zRoom.parse(room));
  })

  .put("/:id/user", zValidator("json", zUserReq), async (ctx) => {
    const roomId = Number(ctx.req.param("id"));
    const { name } = ctx.req.valid("json");
    const db = ctx.env.ROOMS_DB;

    const userId = await new UsersDB(db).create({
      name,
    });
    await new RoomDB(db, roomId).addUser(userId);
    await new UserDB(db, userId).setRoomId(roomId);

    const res = { userId };
    const zRes = z.object({ userId: z.number() });

    return ctx.jsonT(zRes.parse(res), 201);
  })

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

      return ctx.text("", 200);
    }
  )

  .put(
    "/:id/data/item",
    zValidator(
      "json",
      z.object({
        item: zRoom.shape.data.shape.items.element,
      })
    ),
    async (ctx) => {
      const roomId = Number(ctx.req.param("id"));
      const { item } = ctx.req.valid("json");

      await new RoomDB(ctx.env.ROOMS_DB, roomId).addItem(item);

      return ctx.text("", 200);
    }
  )

  .delete("/:id", async (ctx) => {
    const roomId = Number(ctx.req.param("id"));
    await new RoomDB(ctx.env.ROOMS_DB, roomId).destroy();

    return ctx.text("", 204);
  });
