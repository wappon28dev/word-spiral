export type ElementType<T extends unknown[]> = T extends Array<infer U>
  ? U
  : never;

export type OmitStrict<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
