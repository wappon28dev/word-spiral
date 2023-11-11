export type ElementType<T extends unknown[]> = T extends Array<infer U>
  ? U
  : never;
