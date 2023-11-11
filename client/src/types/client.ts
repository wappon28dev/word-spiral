import { type AppType } from "@api-rooms";
import { type hc } from "hono/client";

export type HonoClient = ReturnType<typeof hc<AppType>>;
