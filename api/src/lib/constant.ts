import { Hono } from "hono";

export type ENV = {
  BARD_API_KEY: string;
  BARD_DEFAULT_CHAT_ID: string;
};

export type Variables = never;

export type ValueOf<T> = T[keyof T];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createHono() {
  return new Hono<{ Bindings: ENV; Variables: Variables }>();
}
