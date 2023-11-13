/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type InferResponseType, hc, type InferRequestType } from "hono/client";
import { type AppType } from "@api-rooms";
import { type HonoClient } from "@/types/client";

const defaultUrl = "http://localhost:8787";
export const getHonoClient = (url = defaultUrl): HonoClient => hc<AppType>(url);

export function useRooms(client: HonoClient) {
  const _getAll = client.v1.rooms.$get;
  async function getAll(): Promise<InferResponseType<typeof _getAll>> {
    return (await _getAll()).json();
  }

  const _create = client.v1.rooms.$post;
  async function create({
    name,
  }: InferRequestType<typeof _create>["json"]): Promise<
    InferResponseType<typeof _create>
  > {
    const res = await _create({
      json: { name },
    });

    return res.json();
  }

  const _join = client.v1.rooms[":id"].user.$put;
  async function join(
    _roomId: number,
    { name }: InferRequestType<typeof _join>["json"]
  ): Promise<InferResponseType<typeof _join>> {
    const res = await _join({
      param: { id: String(_roomId) },
      json: { name },
    });
    return res.json();
  }

  return {
    getAll,
    create,
    join,
  };
}
