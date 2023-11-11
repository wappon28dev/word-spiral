import { createHono } from "lib/constant";
import { cors } from "hono/cors";
import { rooms } from "./rooms";

export const v1 = createHono().use("*", cors()).route("/rooms", rooms);
