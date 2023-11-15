import { createHono } from "lib/constant";
import { cors } from "hono/cors";
import { words } from "./words";

export const v1 = createHono().use("*", cors()).route("/words", words);
