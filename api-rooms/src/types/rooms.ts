import { z } from "zod";

export const zRoom = z.object({
  id: z.number(),
  status: z.string(),
  users: z.array(z.string()),
  leader: z.string(),
  items: z.array(
    z.object({
      user: z.string(),
      word: z.string(),
      cosSimilarity: z.number().optional(),
    })
  ),
});

export type RoomsRaw = {
  id: number;
  status: string;
  users: string;
  leader: string;
  items: string;
};

export type Rooms = z.infer<typeof zRoom>;
