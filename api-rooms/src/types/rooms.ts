import { z } from "zod";

export const zRoom = z.object({
  id: z.number(),
  status: z.union([
    z.literal("INVITATION"),
    z.literal("PLAYING"),
    z.literal("FINISHED"),
    z.literal("TEST"),
  ]),
  leader_id: z.number(),
  user_ids: z.array(z.number()),
  data: z.object({
    items: z.array(
      z.object({
        userId: z.number(),
        word: z.string(),
      })
    ),
    info: z.object({
      roomName: z.string(),
    }),
  }),
});

export type RoomRaw = {
  id: number;
  status: string;
  leader_id: number;
  user_ids: string;
  data: string;
};

export type Room = z.infer<typeof zRoom>;
