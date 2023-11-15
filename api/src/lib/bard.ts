import Bard from "bard-ai";
import { extractJsonFromString } from "./extractor";
import { type ENV } from "./constant";

export async function askBard(env: ENV, prompt: string): Promise<string> {
  const bard = new Bard(env.BARD_API_KEY);
  const chat = bard.createChat();
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
