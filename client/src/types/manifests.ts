import { type ReactElement } from "react";
import type manifests from "@/assets/manifest";

export type PageManifest = {
  title: ReactElement;
  description?: ReactElement;
};

export type SceneManifest = {
  title: ReactElement;
  description: ReactElement;
  pages: Record<string, PageManifest>;
};

export type SceneId = keyof typeof manifests;
export type PageId<T extends SceneId> = keyof (typeof manifests)[T]["pages"];

export type AllPageId = {
  [K in SceneId]: PageId<K>;
};

export type AllPageManifest = {
  [K in SceneId]: {
    [L in PageId<K>]: PageManifest;
  };
};
