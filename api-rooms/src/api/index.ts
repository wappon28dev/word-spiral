import { createHono } from "lib/constant";
import { rooms } from "./rooms";

export const v1 = createHono()
  .get("/", (ctx) => ctx.text("he"))
  .route("/rooms", rooms);
