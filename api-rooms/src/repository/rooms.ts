import { DatabaseError } from "lib/error";
import { type RoomsRaw, type Rooms } from "types/rooms";

export class RoomsDB {
  constructor(protected readonly db: D1Database) {}

  private parseRoom(row: RoomsRaw): Rooms {
    return {
      id: row.id,
      status: row.status,
      users: JSON.parse(row.users),
      leader: row.leader,
      items: JSON.parse(row.items),
    };
  }

  async getAll(): Promise<Rooms[]> {
    let selectResult: D1Result<RoomsRaw> | undefined;
    try {
      selectResult = await this.db.prepare("SELECT * FROM rooms").all();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new DatabaseError(
        JSON.stringify({ summary: err.message, detail: err.cause.message })
      );
    }

    if (!selectResult?.success) {
      throw new DatabaseError("Failed to get all users");
    }

    const rooms: Rooms[] = [];
    selectResult.results.forEach((row) => {
      rooms.push(this.parseRoom(row));
    });
    console.log(JSON.stringify(rooms));

    return rooms;
  }

  async add(user: string): Promise<number> {
    let insertResult: D1Result<RoomsRaw> | undefined;
    let idResult: D1Result<{ "last_insert_rowid()": number }> | undefined;

    try {
      insertResult = await this.db
        .prepare(
          `INSERT INTO rooms (status, leader, users, items) VALUES ('INVITATION', '${user}', '["${user}"]', '[]')`
        )
        .run();
      idResult = await this.db.prepare("SELECT last_insert_rowid()").run();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new DatabaseError(
        JSON.stringify({ summary: err.message, detail: err.cause.message })
      );
    }

    if (!insertResult?.success || !idResult?.success) {
      throw new DatabaseError("Failed to insert user");
    }
    return idResult.results[0]["last_insert_rowid()"];
  }
}

export class RoomDB extends RoomsDB {
  constructor(
    readonly db: D1Database,
    readonly id: string
  ) {
    super(db);
  }

  private async exists(): Promise<boolean> {
    let existsResult: D1Result<Rooms> | undefined | null;
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
}
