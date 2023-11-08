import { DatabaseError } from "lib/error";
import { type RoomsRaw, type Room, type RoomUser } from "types/rooms";
import { z } from "zod";

export class RoomsDB {
  constructor(protected readonly db: D1Database) {}

  private parseRoom(row: RoomsRaw): Room {
    return {
      id: row.id,
      status: row.status as Room["status"],
      leader_id: row.leader_id,
      user_ids: JSON.parse(row.user_ids),
      data: JSON.parse(row.data),
    };
  }

  async getAll(): Promise<Room[]> {
    let selectResult: D1Result<RoomsRaw> | undefined;
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
      rooms.push(this.parseRoom(row));
    });

    return rooms;
  }

  async makeUserInRoom(userId: number, roomId: number): Promise<void> {
    console.log(`Making user ${userId} in room ${roomId}`);
    let updateResult: D1Result<RoomsRaw> | undefined;
    try {
      updateResult = await this.db
        .prepare(`UPDATE users SET room_id = ${roomId} WHERE id = ${userId}`)
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
    console.log(`Done!`);
  }

  protected async addUser({ name }: { name: string }): Promise<number> {
    console.log("Adding user");
    let insertResult: D1Result<RoomUser> | undefined;

    try {
      insertResult = await this.db
        .prepare("INSERT INTO users (name) VALUES (?)")
        .bind(name)
        .run();
    } catch (err: any) {
      console.error(err);
      throw new DatabaseError("Failed to insert user");
    }

    if (!insertResult?.success) {
      throw new DatabaseError("Failed to insert user");
    }

    console.log(`Added User: ${JSON.stringify(insertResult)}}`);
    return z
      .preprocess((v) => Number(v), z.number().positive())
      .parse(insertResult.meta.last_row_id);
  }

  private async addRoom(leaderId: number): Promise<number> {
    console.log("Adding room");
    let insertResult: D1Result<RoomsRaw> | undefined;

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

  async addFirst({
    name,
  }: {
    name: string;
  }): Promise<{ userId: number; roomId: number }> {
    const userId = await this.addUser({ name });
    const roomId = await this.addRoom(userId);
    await this.makeUserInRoom(userId, roomId);

    return { userId, roomId };
  }
}

export class RoomDB extends RoomsDB {
  constructor(
    readonly db: D1Database,
    readonly id: number
  ) {
    super(db);
  }

  private async exists(): Promise<boolean> {
    let existsResult: D1Result<Room> | undefined | null;
    try {
      existsResult = await this.db
        .prepare("SELECT * FROM rooms WHERE id = ?")
        .bind(this.id)
        .first();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new DatabaseError(
        JSON.stringify({ summary: err.message, detail: err.cause.message })
      );
    }

    if (existsResult === undefined) {
      throw new DatabaseError("Failed to check whether user exists");
    }

    return existsResult !== null;
  }

  async addRoomUser({ name }: { name: string }): Promise<{ userId: number }> {
    if (!(await this.exists())) {
      throw new DatabaseError("Room does not exist");
    }

    const userId = await this.addUser({ name });
    await this.makeUserInRoom(userId, this.id);
    return { userId };
  }

  async updateStatus(status: Room["status"]): Promise<void> {
    let updateResult: D1Result<RoomsRaw> | undefined;
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
}
