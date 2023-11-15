import { type ReactNode } from "react";

export type PopoverElementInfo = {
  id: string;
  rect: DOMRect;
};

export type MapDataHachimitsu = Record<
  string,
  { name: ReactNode; description: ReactNode | undefined }
>;

export type MapDataHimawari = Record<
  string,
  {
    name: ReactNode;
    description: ReactNode;
    keyword: Array<"ひ" | "ま" | "わ" | "り">;
  }
>;

export type MapData = MapDataHachimitsu | MapDataHimawari;
