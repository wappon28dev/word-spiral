"use client";

import { useAtomValue } from "jotai";
import { type ReactElement } from "react";
import { styled as p } from "panda/jsx";
import { atomIsLoading } from "@/lib/store/ui";
import Ruby from "./Ruby";

export default function Loading(): ReactElement {
  const isLoading = useAtomValue(atomIsLoading);

  return (
    <p.div
      bg="yellow.100"
      cursor={isLoading ? "progress" : "default"}
      display="table"
      h={["100vh", "100dvh"]}
      left="0"
      opacity={isLoading ? 1 : 0.01}
      overflowY={isLoading ? "hidden" : "auto"}
      pointerEvents={isLoading ? "auto" : "none"}
      position="fixed"
      top="0"
      transition="all 300ms ease-in-out"
      w={["100vw", "100dvw"]}
      zIndex={isLoading ? 999 : -1}
    >
      <p.div
        color="black"
        display="table-cell"
        textAlign="center"
        verticalAlign="middle"
      >
        <Ruby rb="読み込み" rt="よみこみ" />
        <Ruby rb="中" rt="ちゅう" />
        ...
      </p.div>
    </p.div>
  );
}
