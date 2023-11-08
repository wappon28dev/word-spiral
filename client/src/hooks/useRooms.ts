import { type InferResponseType, hc } from "hono/client";
import { type AppType } from "@api-rooms";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useRooms(url = "http://localhost:8787") {
  const client = hc<AppType>(url);

  const _apiGet = client.v1.$get;
  const _apiPost = client.v1.$post;

  async function getAll(): Promise<InferResponseType<typeof _apiGet>> {
    const req = client.v1.$get();
    return await (await req).json();
  }

  async function create({
    user,
  }: {
    user: string;
  }): Promise<InferResponseType<typeof _apiPost>> {
    const req = client.v1.$post({
      json: {
        user,
      },
    });
    return await (await req).json();
  }

  return {
    roomsV1: client.v1,
    getAll,
    create,
  };
}
