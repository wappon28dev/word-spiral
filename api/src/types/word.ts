import { z } from "zod";

export const _zWordData = z.object({ emoji: z.string(), word: z.string() });
export type WordData = z.infer<typeof _zWordData>;
