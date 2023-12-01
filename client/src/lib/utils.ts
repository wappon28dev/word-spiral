import type useViewTransitionRouter from "@/hooks/useViewTransitionRouter";

type Entries<T> = Array<
  keyof T extends infer U ? (U extends keyof T ? [U, T[U]] : never) : never
>;
export function getKeys<T extends Record<string, unknown>>(
  obj: T
): Array<keyof T> {
  return Object.keys(obj);
}
export function getValues<T extends Record<string, any>>(
  obj: T
): Array<T[keyof T]> {
  return Object.values(obj);
}
export function getEntries<T extends Record<string, unknown>>(
  obj: T
): Entries<T> {
  return Object.entries(obj) as Entries<T>;
}

export type valueOf<T> = T[keyof T];
export type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

export function push(
  router: ReturnType<typeof useViewTransitionRouter>,
  arr: ["" | "articles", ...Array<string | number | symbol>]
): void {
  router.push(`/${arr.join("/")}`);
}

export type PartialRequire<O, K extends keyof O> = {
  [P in K]-?: O[P];
} & O;

export type ElementType<T extends unknown[]> = T extends Array<infer U>
  ? U
  : never;

export type OmitStrict<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
