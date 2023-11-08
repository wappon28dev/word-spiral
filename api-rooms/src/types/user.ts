import { z } from "zod";

export const zUser = z.object({
  id: z.number(),
  name: z.string(),
  room_id: z.number(),
});
