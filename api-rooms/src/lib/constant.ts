import { Hono } from "hono";

export type ENV = {
  ROOMS_DB: D1Database;
};

export type Variables = never;

export type ValueOf<T> = T[keyof T];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createHono() {
  return new Hono<{ Bindings: ENV; Variables: Variables }>();
}