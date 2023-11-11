import { z } from "zod";

export const zUser = z.object({
  id: z.number(),
  name: z.string(),
  room_id: z.number(),
});

export type UserRaw = {
  id: number;
  name: string;
  room_id: number;
};

export type User = z.infer<typeof zUser>;
