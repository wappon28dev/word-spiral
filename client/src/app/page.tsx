"use client";

import { type ReactElement } from "react";
import packageJson from "package";
import { styled as p } from "panda/jsx";
import { Button } from "@mantine/core";
import { useAtomValue } from "jotai";
import { atomRoomId, atomUserId } from "@/lib/store/data";
import { Room } from "@/lib/room";
import { getHonoClient, useRooms } from "@/hooks/useRooms";

export default function Page(): ReactElement {
  const userId = useAtomValue(atomUserId);
  const roomId = useAtomValue(atomRoomId);

  const { create, getAll } = useRooms(getHonoClient());

  if (roomId == null || userId == null)
    throw new Error("roomId or userId is null");

  const room = new Room(roomId, userId, getHonoClient());

  const VERSION = packageJson.version;

  const onCreate = async (): Promise<void> => {
    const rooms = await create({
      name: "test",
    });
    console.log(rooms);
  };

  const onGet = async (): Promise<void> => {
    const rooms = await room.get();
    console.log(rooms);
  };

  const onGetAll = async (): Promise<void> => {
    const rooms = await getAll();
    console.log(rooms);
  };

  const onStart = async (): Promise<void> => {
    const rooms = await room.startPlaying();
    console.log(rooms);
  };

  return (
    <p.main h="100%" w="100%">
      <p.div>
        ルーム
        <Button onClick={onCreate}>作成</Button>
        <Button onClick={onGet}>取得</Button>
        <Button onClick={onStart}>スタート</Button>
        <Button onClick={onGetAll}>全取得</Button>
      </p.div>
      <p.div>
        userId: {userId}
        <br />
        roomId: {roomId}
      </p.div>
      <p.div bottom="0" left="0" p="10px" position="absolute">
        v{VERSION}
      </p.div>
    </p.main>
  );
}
