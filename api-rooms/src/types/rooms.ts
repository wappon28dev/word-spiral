import { z } from "zod";

export const zRoomUser = z.object({
  name: z.string(),
  score: z.number(),
});

export const zRoom = z.object({
  id: z.number(),
  status: z.union([
    z.literal("INVITATION"),
    z.literal("PLAYING"),
    z.literal("FINISHED"),
  ]),
  leader_id: z.number(),
  user_ids: z.array(z.number()),
  data: z.object({
    items: z.array(
      z.object({
        user: z.number(),
        word: z.string(),
      })
    ),
    info: z.object({
      roomName: z.string(),
    }),
  }),
});

export type RoomsRaw = {
  id: number;
  status: string;
  leader_id: number;
  user_ids: string;
  data: string;
};

export type Room = z.infer<typeof zRoom>;
export type RoomUser = z.infer<typeof zRoomUser>;
