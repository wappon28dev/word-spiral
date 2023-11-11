/* eslint-disable no-console */
// eslint-disable-next-line max-classes-per-file
import { DatabaseError } from "lib/error";
import { type RoomRaw, type Room } from "types/rooms";
import { type ElementType } from "types/util";
import { z } from "zod";

type D1ResultRoomRaw = D1Result<RoomRaw>;

export class RoomsDB {
  constructor(protected readonly db: D1Database) {}

  protected static parse(row: RoomRaw): Room {
    return {
      id: row.id,
      status: row.status as Room["status"],
      leader_id: row.leader_id,
      user_ids: JSON.parse(row.user_ids),
      data: JSON.parse(row.data),
    };
  }

  async getAll(): Promise<Room[]> {
    let selectResult: D1ResultRoomRaw | undefined;
    try {
      selectResult = await this.db.prepare("SELECT * FROM rooms").all();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new DatabaseError(
        `Failed to get all users: ${JSON.stringify({
          summary: err.message,
          detail: err.cause.message,
        })}`
      );
    }

    if (!selectResult?.success) {
      throw new DatabaseError("Failed to get all users");
    }

    const rooms: Room[] = [];
    selectResult.results.forEach((row) => {
      rooms.push(RoomsDB.parse(row));
    });

    return rooms;
  }

  public async create(leaderId: number): Promise<number> {
    console.log("Adding room");
    let insertResult: D1ResultRoomRaw | undefined;

    const emptyData = { items: [], info: { roomName: "test" } };

    try {
      insertResult = await this.db
        .prepare(
          `INSERT INTO
            rooms (status, leader_id, user_ids, data)
          VALUES (
            'INVITATION',
            ${leaderId},
            '[${leaderId}]',
            '${JSON.stringify(emptyData)}'
          );`
        )
        .run();
    } catch (err: any) {
      console.error(err);
      throw new DatabaseError("Failed to insert user");
    }

    if (!insertResult?.success) {
      throw new DatabaseError("Failed to insert user");
    }

    console.log(`Added Room: ${JSON.stringify(insertResult)}`);

    return z.number().parse(insertResult.meta.last_row_id);
  }
}

export class RoomDB extends RoomsDB {
  constructor(
    readonly db: D1Database,
    readonly id: number
  ) {
    super(db);

    void this.exists().then((_exists) => {
      if (!_exists) {
        throw new DatabaseError("Room does not exist");
      }
    });
  }

  public async exists(): Promise<boolean> {
    let existsResult: D1ResultRoomRaw | undefined | null;
    try {
      existsResult = await this.db
        .prepare("SELECT * FROM rooms WHERE id = ?")
        .bind(this.id)
        .run();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new DatabaseError(
        JSON.stringify({ summary: err.message, detail: err.cause.message })
      );
    }

    if (!existsResult?.success) {
      throw new DatabaseError("Failed to check whether user exists");
    }

    return existsResult.results.length > 0;
  }

  async get(): Promise<Room> {
    let selectResult: D1ResultRoomRaw | null | undefined;
    try {
      selectResult = await this.db
        .prepare("SELECT * FROM rooms WHERE id = ?")
        .bind(this.id)
        .run();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new DatabaseError(
        `Failed to get rooms: ${JSON.stringify({
          summary: err.message,
          detail: err.cause.message,
        })}`
      );
    }

    if (!selectResult?.success) {
      throw new DatabaseError("Failed to get room");
    }

    return RoomDB.parse(selectResult.results[0]);
  }

  async updateStatus(status: Room["status"]): Promise<void> {
    let updateResult: D1ResultRoomRaw | undefined;
    try {
      updateResult = await this.db
        .prepare(`UPDATE rooms SET status = '?' WHERE id = ?`)
        .bind(status, this.id)
        .run();
    } catch (err: any) {
      throw new DatabaseError(
        `Failed to update user: ${JSON.stringify({
          summary: err.message,
          detail: err.cause.message,
        })}`
      );
    }

    if (!updateResult?.success) {
      throw new DatabaseError("Failed to update user");
    }
  }

  async addItem(item: ElementType<Room["data"]["items"]>): Promise<void> {
    const { data } = await this.get();
    const newData: Room["data"] = {
      items: [...data.items, item],
      info: data.info,
    };

    let updateResult: D1ResultRoomRaw | undefined;

    try {
      updateResult = await this.db
        .prepare(`UPDATE rooms SET data = ? WHERE id = ?`)
        .bind(JSON.stringify(newData), this.id)
        .run();
    } catch (err: any) {
      throw new DatabaseError(
        `Failed to update item: ${JSON.stringify({
          summary: err.message,
          detail: err.cause.message,
        })}`
      );
    }

    if (!updateResult?.success) {
      throw new DatabaseError("Failed to update item");
    }
  }

  async destroy(): Promise<void> {
    let destroyResult: D1ResultRoomRaw | undefined;
    try {
      destroyResult = await this.db
        .prepare(`DELETE FROM rooms WHERE id = ?`)
        .bind(this.id)
        .run();
    } catch (err: any) {
      throw new DatabaseError(
        `Failed to destroy room: ${JSON.stringify({
          summary: err.message,
          detail: err.cause.message,
        })}`
      );
    }

    if (!destroyResult?.success) {
      throw new DatabaseError("Failed to destroy room");
    }
  }
}
