import { type Lang } from "types/lang";
import { siteId } from "@/assets/info";
import { type CharacterType } from "@/types/atom/ui";

export const localStorageVersion = 1;

export type LocalStorageScheme = {
  characterType: CharacterType;
  lang: Lang;
};

export function getLocalStorageKey<T extends keyof LocalStorageScheme>(
  key: T
): string {
  return `${siteId}.v${localStorageVersion}.${key}`;
}

export class LocalStorage<T extends keyof LocalStorageScheme> {
  constructor(public readonly key: T) {}

  public getStorageKey = (): string => getLocalStorageKey(this.key);

  public get(): LocalStorageScheme[T] | undefined {
    const data = localStorage.getItem(this.getStorageKey());
    if (data == null) return undefined;
    return JSON.parse(data);
  }

  public set(data: LocalStorageScheme[T]): void {
    if (data == null) return;
    localStorage.setItem(this.getStorageKey(), JSON.stringify(data));
  }

  public clear(): void {
    localStorage.removeItem(this.getStorageKey());
  }

  public static clearAll(): void {
    localStorage.clear();
  }
}
