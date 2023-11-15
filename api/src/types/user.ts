import { z } from "zod";

export const zUser = z.object({
  id: z.number(),
  name: z.string(),
  room_id: z.number(),
});

export const zUserReq = z.object({
  name: z.string(),
});

export type UserRaw = {
  id: number;
  name: string;
  room_id: number;
};

export type User = z.infer<typeof zUser>;
export type UserReq = z.infer<typeof zUserReq>;
