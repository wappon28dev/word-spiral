/* eslint-disable no-console */
import { type InferRequestType, type InferResponseType } from "hono";
import { type OmitStrict } from "types/util";
import { type HonoClient } from "@/types/client";

export class Room {
  constructor(
    public roomId: number,
    public userId: number,
    private readonly api: HonoClient
  ) {}

  public _get = this.api.v1.rooms[":id"].$get;
  public async get(): Promise<InferResponseType<typeof this._get>> {
    const res = await this._get({
      param: { id: String(this.roomId) },
    });

    return res.json();
  }

  public _addItem = this.api.v1.rooms[":id"].data.item.$put;
  public async addItem(
    item: OmitStrict<
      InferRequestType<typeof this._addItem>["json"]["item"],
      "userId"
    >
  ): Promise<void> {
    await this._addItem({
      param: { id: String(this.roomId) },
      json: {
        item: {
          ...item,
          userId: this.userId,
        },
      },
    });
  }

  public _status = this.api.v1.rooms[":id"].status.$put;
  public async startPlaying(): Promise<void> {
    await this._status({
      param: { id: String(this.roomId) },
      json: { status: "PLAYING" },
    });
  }

  public async updateStatus({
    status,
  }: InferRequestType<typeof this._status>["json"]): Promise<void> {
    await this._status({
      param: { id: String(this.roomId) },
      json: { status },
    });
  }

  /// NOTE: userId と roomId を undefined にするのを忘れないこと～
  public async destroy(): Promise<void> {
    await this.api.v1.rooms[":id"].$delete({
      param: { id: String(this.roomId) },
    });
  }
}
