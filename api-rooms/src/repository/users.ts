import { DatabaseError } from "lib/error";
import { type User, type UserRaw } from "types/user";
import { z } from "zod";

type D1ResultUserRaw = D1Result<UserRaw>;

export class UsersDB {
  constructor(readonly db: D1Database) {}

  protected static parse(row: UserRaw): User {
    return row;
  }

  public async getAll(): Promise<User[]> {
    let selectResult: D1ResultUserRaw | null | undefined;
    try {
      selectResult = await this.db.prepare("SELECT * FROM users").run();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new DatabaseError(
        `Failed to get users: ${JSON.stringify({
          summary: err.message,
          detail: err.cause.message,
        })}`
      );
    }

    if (!selectResult?.success) {
      throw new DatabaseError("Failed to get all users");
    }

    const users: User[] = [];
    selectResult.results.forEach((row) => {
      users.push(UsersDB.parse(row));
    });

    return users;
  }

  public async create({ name }: { name: string }): Promise<number> {
    console.log("Adding user");
    let insertResult: D1ResultUserRaw | undefined;

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
}

export class UserDB extends UsersDB {
  constructor(
    readonly db: D1Database,
    readonly id: number
  ) {
    super(db);
  }

  public async exists(): Promise<boolean> {
    let existsResult: D1ResultUserRaw | undefined | null;
    try {
      existsResult = await this.db
        .prepare("SELECT * FROM users WHERE id = ?")
        .bind(this.id)
        .run();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new DatabaseError(
        JSON.stringify({ summary: err.message, detail: err.cause.message })
      );
    }

    if (!existsResult?.success) {
      throw new DatabaseError("Failed to check if user exists");
    }

    return existsResult.results.length > 0;
  }

  public async get(): Promise<User> {
    let selectResult: D1ResultUserRaw | undefined | null;
    try {
      selectResult = await this.db
        .prepare("SELECT * FROM users WHERE id = ?")
        .bind(this.id)
        .run();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new DatabaseError(
        JSON.stringify({ summary: err.message, detail: err.cause.message })
      );
    }

    if (!selectResult?.success) {
      throw new DatabaseError("Failed to get user");
    }

    return UsersDB.parse(selectResult.results[0]);
  }

  public async setRoomId(roomId: number): Promise<void> {
    console.log(`Making user ${this.id} in room ${roomId}`);
    let updateResult: D1ResultUserRaw | undefined;
    try {
      updateResult = await this.db
        .prepare("UPDATE users SET room_id = ? WHERE id = ?")
        .bind(roomId, this.id)
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
