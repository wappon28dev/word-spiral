import { v1 } from "api";
import { HTTPException } from "hono/http-exception";
import { createHono } from "lib/constant";

const app = createHono()
  .get("/", (ctx) => ctx.text("hello world"))
  .route("/v1", v1)
  .onError((err, ctx) => {
    if (err instanceof HTTPException) {
      return err.getResponse();
    }
    console.error(`error occurred: ${err}`, err.stack);
    return ctx.text("Internal Server Error", 500);
  });

export type AppType = typeof app;
export default app;
