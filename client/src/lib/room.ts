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

  public async awaitUserTurns(): Promise<void> {
    const longPolling = async (): Promise<boolean> => {
      // stream
      const res = await this.api.v1.rooms[":id"].data.item.notify.$post({
        param: { id: String(this.roomId) },
        json: { userId: this.userId },
      });

      console.log("awaiting user turns...");
      const text = await res.text();
      return text === "ok";
    };

    let retryCount = 0;
    let isSucceeded = false;

    while (retryCount < 20) {
      console.log(`#${retryCount} long polling...`);
      // eslint-disable-next-line no-await-in-loop
      if (await longPolling()) {
        console.log("It's your turn!");
        isSucceeded = true;
        break;
      }

      retryCount += 1;
    }

    if (!isSucceeded) {
      throw new Error("long polling failed");
    }
  }

  /// NOTE: userId と roomId を undefined にするのを忘れないこと～
  public async destroy(): Promise<void> {
    await this.api.v1.rooms[":id"].$delete({
      param: { id: String(this.roomId) },
    });
  }
}
