import { z } from "zod";

export const zRoom = z.object({
  id: z.number(),
  status: z.union([
    z.literal("INVITATION"),
    z.literal("PLAYING"),
    z.literal("FINISHED"),
    z.literal("TEST"),
  ]),
  leaderId: z.number(),
  userIdList: z.array(z.number()),
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
  user_id_list: string;
  data: string;
};

export type Room = z.infer<typeof zRoom>;
