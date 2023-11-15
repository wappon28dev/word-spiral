import { z } from "zod";

export const zChatIds = z.object({
  conversationID: z.string(),
  responseID: z.string(),
  choiceID: z.string(),
  _reqID: z.string(),
});
