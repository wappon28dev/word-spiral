import { Ai } from "@cloudflare/ai";
import { type ENV } from "./constant";
import { type Message, type Answer } from "types/ai";

export async function askAI(env: ENV, messages: Message[]): Promise<Answer> {
  const ai = new Ai(env.AI);
  return await ai.run("@cf/meta/llama-2-7b-chat-int8", {
    messages,
  });
}
