import { type InferResponseType } from "hono";
import { type ElementType, type OmitStrict } from "types/util";
import { type Room as RoomType } from "types/rooms";
import { type HonoClient } from "@/types/client";

export class Room {
  constructor(
    public roomId: number,
    public userId: number,
    private readonly client: HonoClient
  ) {}

  public _get = this.client.v1.rooms[":id"].$get;
  async get(): Promise<InferResponseType<typeof this._get>> {
    const res = await this._get({
      param: { id: String(this.roomId) },
    });

    return res.json();
  }

  public async addItem(
    item: OmitStrict<ElementType<RoomType["data"]["items"]>, "userId">
  ): Promise<void> {
    await this.client.v1.rooms[":id"].data.item.$put({
      param: { id: String(this.roomId) },
      json: {
        item: {
          ...item,
          userId: this.userId,
        },
      },
    });
  }

  async startPlaying(): Promise<void> {
    await this.client.v1.rooms[":id"].status.$put({
      param: { id: String(this.roomId) },
      json: { status: "PLAYING" },
    });
  }

  /// NOTE: userId と roomId を undefined にするのを忘れないこと～
  public async destroy(): Promise<void> {
    await this.client.v1.rooms[":id"].$delete({
      param: { id: String(this.roomId) },
    });
  }
}
