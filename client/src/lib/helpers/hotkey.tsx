import { Kbd } from "@mantine/core";
import { type ReactElement } from "react";
import Ruby from "@/components/Ruby";

// eslint-disable-next-line import/prefer-default-export
export const hotkeyGroupsData = {
  upDown: {
    label: (
      <>
        <Ruby rb="上下" rt="じょうげ" />
        キー
      </>
    ),
    kbd: {
      prev: <Kbd>↑</Kbd>,
      next: <Kbd>↓</Kbd>,
    },
    hotkey: {
      prev: "ArrowUp",
      next: "ArrowDown",
    },
  },
  leftRight: {
    label: (
      <>
        <Ruby rb="左右" rt="さゆう" />
        キー
      </>
    ),
    kbd: {
      prev: <Kbd>←</Kbd>,
      next: <Kbd>→</Kbd>,
    },
    hotkey: {
      prev: "ArrowLeft",
      next: "ArrowRight",
    },
  },
  space: {
    label: (
      <>
        <Ruby rb="スペース" rt="すぺーす" />
        キー
      </>
    ),
    kbd: {
      prev: (
        <>
          <Kbd>Shift</Kbd> + <Kbd>Space</Kbd>
        </>
      ),
      next: <Kbd>Space</Kbd>,
    },
    hotkey: {
      prev: "Shift+Enter",
      next: "Enter",
    },
  },
  enter: {
    label: (
      <>
        <Ruby rb="エンター" rt="えんたー" />
        キー
      </>
    ),
    kbd: {
      prev: (
        <>
          <Kbd>Shift</Kbd> + <Kbd>Enter</Kbd>
        </>
      ),
      next: <Kbd>Enter</Kbd>,
    },
    hotkey: {
      prev: "Shift+Space",
      next: "Space",
    },
  },
} satisfies Record<
  string,
  {
    label: ReactElement;
    kbd: { prev: JSX.Element; next: JSX.Element };
    hotkey: { prev: string; next: string };
  }
>;
