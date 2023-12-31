// eslint-disable-next-line max-classes-per-file
import { HTTPException } from "hono/http-exception";

export class NetworkError extends HTTPException {
  constructor(reason: string) {
    super(500, { message: `Network Error: ${reason}` });
  }
}

export class ResponseNotOkError extends HTTPException {
  constructor(message: string, reason: string) {
    super(500, { message: `Response Not OK: ${message} ${reason}` });
  }
}
export class DatabaseError extends HTTPException {
  constructor(reason: string, status: number = 500) {
    super(status, { message: `Database Error: ${reason}` });
  }
}
