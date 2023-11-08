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
  constructor(reason: string, status?: number) {
    super(status ?? 500, { message: `Database Error: ${reason}` });
  }
}
