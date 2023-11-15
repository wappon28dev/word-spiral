import { atom } from "jotai";
import { type ActionStatus } from "@/types/atom/data";

export const atomAPIurlRoom = atom<string>("http://localhost:8787");
export const atomAPIurlWord2vec = atom<string>("http://localhost:8787");
export const atomRoomId = atom<number | undefined>(undefined);
export const atomUserId = atom<number | undefined>(undefined);
export const atomActionStatus = atom<ActionStatus | undefined>(undefined);
