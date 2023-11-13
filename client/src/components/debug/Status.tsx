/* eslint-disable no-console */
import { useState, type ReactElement } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { type Room as RoomType } from "types/rooms";
import { styled as p } from "panda/jsx";
import { Button } from "@mantine/core";
import { Section } from "./Section";
import { getHonoClient, useRooms } from "@/hooks/useRooms";
import {
  atomAPIurlRoom,
  atomUserId,
  atomRoomId,
  atomActionStatus,
} from "@/lib/store/data";
import { Room } from "@/lib/room";
import { requestWithActionStatus } from "@/lib/request";

export function Status(): ReactElement {
  const apiUrlRoom = useAtomValue(atomAPIurlRoom);
  const userId = useAtomValue(atomUserId);
  const roomId = useAtomValue(atomRoomId);
  const setActionStatus = useSetAtom(atomActionStatus);

  const roomClient = getHonoClient(apiUrlRoom);
  const rooms = useRooms(roomClient);

  const [roomData, setRoomData] = useState<RoomType>();
  const [allRoomsData, setAllRoomsData] = useState<RoomType[]>();
  const [actionLoading, setActionLoading] = useState<"ROOM" | "ALL_ROOMS">();

  async function getAllRoomsData(): Promise<void> {
    void requestWithActionStatus({
      requestInfo: {
        message: "getting all room data",
        from: "getAllRoomData",
        setActionStatus,
      },

      request: rooms.getAll(),

      onRequestBefore: () => {
        setActionLoading("ALL_ROOMS");
      },
      onSucceeded: setAllRoomsData,
      onFailed: () => {
        setAllRoomsData(undefined);
      },
      onRequestAfter: () => {
        setActionLoading(undefined);
      },
    });
  }

  async function getRoomData(): Promise<void> {
    if (userId == null || roomId == null) {
      setActionStatus({
        message: "userId or roomId is empty",
        from: "getRoomData",
        status: "error",
      });
      return;
    }

    const room = new Room(roomId, userId, roomClient);

    void requestWithActionStatus({
      requestInfo: {
        message: "getting room data",
        from: "getRoomData",
        setActionStatus,
      },

      request: room.get(),

      onRequestBefore: () => {
        setActionLoading("ROOM");
      },
      onSucceeded: setRoomData,
      onFailed: () => {
        setRoomData(undefined);
      },
      onRequestAfter: () => {
        setActionLoading(undefined);
      },
    });
  }

  function RoomData({ data }: { data: RoomType }): ReactElement {
    return (
      <p.div border="1px solid gray" p="10px" rounded="md">
        ID: {data.id}
        <br />
        status: {data.status}
        <br />
        leaderId: {data.leaderId}
        <br />
        userIdList: {data.userIdList.join(", ")}
        <br />
        data: {JSON.stringify(data.data)}
      </p.div>
    );
  }

  return (
    <Section bg="red.100" name="Status">
      <Section name="All Rooms">
        <Button
          loading={actionLoading === "ALL_ROOMS"}
          onClick={() => {
            void getAllRoomsData();
          }}
          size="lg"
          variant="light"
          w="200px"
        >
          Get all rooms data
        </Button>
        {allRoomsData != null ? (
          allRoomsData.map((_roomData) => (
            <RoomData key={_roomData.id} data={_roomData} />
          ))
        ) : (
          <p.p />
        )}
      </Section>
      <Section name="Room">
        <Button
          disabled={roomId == null || userId == null}
          loading={actionLoading === "ROOM"}
          onClick={() => {
            void getRoomData();
          }}
          size="lg"
          variant="light"
          w="200px"
        >
          Get room data
        </Button>
        {roomData != null ? (
          <RoomData key={roomData.id} data={roomData} />
        ) : (
          <p.p />
        )}
      </Section>
    </Section>
  );
}
