"use client";

import { type ReactElement } from "react";
import packageJson from "package";
import { styled as p } from "panda/jsx";
import { Button } from "@mantine/core";
import { useRooms } from "@/hooks/useRooms";

export default function Page(): ReactElement {
  const { create } = useRooms();
  const VERSION = packageJson.version;

  const onClick = async (): Promise<void> => {
    const rooms = await create({ user: "たけぴ" });
    console.log(rooms);
  };

  return (
    <p.main h="100%" w="100%">
      <p.div>
        ルーム
        <Button onClick={onClick}>作成</Button>
      </p.div>
      <p.div bottom="0" left="0" p="10px" position="absolute">
        v{VERSION}
      </p.div>
    </p.main>
  );
}
