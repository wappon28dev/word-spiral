import { atom } from "jotai";
import { type ActionStatus } from "@/types/atom/data";
import { type useWords } from "@/hooks/useWords";

const _isProd = process.env.NODE_ENV === "production";
export const atomApiUrl = atom<string>(
  _isProd ? "https://api.word-spiral.wappon28.dev" : "http://localhost:8787"
);
export const atomActionStatus = atom<ActionStatus | undefined>(undefined);

export type Words = Awaited<
  ReturnType<ReturnType<typeof useWords>["getWords"]>
>;
export const atomWords = atom<Words | undefined>(undefined);
