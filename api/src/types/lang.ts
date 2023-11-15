import { z } from "zod";

export const zLang = z.union([z.literal("ja-jp"), z.literal("en-us")]);
export type Lang = z.infer<typeof zLang>;
