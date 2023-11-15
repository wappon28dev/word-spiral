import Bard from "bard-ai";
import { extractJsonFromString } from "./extractor";
import { type ENV } from "./constant";
import { type z } from "zod";
import { type zChatIds } from "types/bard";

export async function askBard(env: ENV, prompt: string): Promise<string> {
  const bard = new Bard(env.BARD_API_KEY);

  const chatIds: z.infer<typeof zChatIds> = JSON.parse(
    env.BARD_DEFAULT_CHAT_IDS
  );
  const chat = bard.createChat(chatIds);
  const answer = (await chat.ask(prompt)) as string;
  console.log(chat.export());
  return answer;
}

export async function askBardWithJson<T extends object>(
  env: ENV,
  prompt: string
): Promise<{
  json: T;
  answer: string;
}> {
  const answer = await askBard(env, prompt);
  console.log(`res:\n${answer}`);

  return { json: extractJsonFromString<T>(answer), answer };
}
