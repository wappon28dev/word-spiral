/* eslint-disable no-console */
import { TextInput, NumberInput, Button } from "@mantine/core";
import { useAtomValue, useSetAtom } from "jotai";
import { type ReactElement, useState } from "react";
import { styled as p } from "panda/jsx";
import { Room } from "@/lib/room";
import { getHonoClient } from "@/hooks/useRooms";
import { Section } from "./Section";
import {
  atomAPIurlRoom,
  atomUserId,
  atomRoomId,
  atomActionStatus,
} from "@/lib/store/data";

export function Action(): ReactElement {
  const apiUrlRoom = useAtomValue(atomAPIurlRoom);
  const userId = useAtomValue(atomUserId);
  const roomId = useAtomValue(atomRoomId);
  const setActionStatus = useSetAtom(atomActionStatus);

  const roomClient = getHonoClient(apiUrlRoom);

  const [actionLoading, setActionLoading] = useState<"AWAIT" | "SEND">();
  const [word, setWord] = useState<string>("");

  const disabled = roomId == null || userId == null;

  const awaitUserTurn = async (): Promise<void> => {
    if (disabled) return;
    const room = new Room(roomId, userId, roomClient);

    setActionStatus({
      message: "Awaiting user turns...",
      from: "awaitUserTurn",
      status: "loading",
    });
    setActionLoading("AWAIT");

    void room
      .awaitUserTurns()
      .then(() => {
        setActionStatus({
          message: "It's your turn!",
          from: "awaitUserTurn",
          status: "success",
        });
      })
      .catch((e) => {
        console.error(e);
        setActionStatus({
          message: e.message,
          from: "awaitUserTurn",
          status: "error",
        });
      })
      .finally(() => {
        setActionLoading(undefined);
      });
  };

  const sendItem = async (): Promise<void> => {
    if (disabled || word === "") return;
    const room = new Room(roomId, userId, roomClient);

    setActionStatus({
      message: "Sending item...",
      from: "sendItem",
      status: "loading",
    });
    setActionLoading("SEND");

    void room
      .addItem({ word })
      .then(() => {
        setWord("");
        setActionStatus({
          message: "Sent item!",
          from: "sendItem",
          status: "success",
        });
      })
      .catch((e) => {
        console.error(e);
        setActionStatus({
          message: e.message,
          from: "sendItem",
          status: "error",
        });
      })
      .finally(() => {
        setActionLoading(undefined);
      });
  };

  return (
    <Section bg="green.100" name="Action">
      <Section name="Item">
        <Button
          disabled={disabled}
          loaderProps={{
            size: "sm",
          }}
          loading={actionLoading === "AWAIT"}
          onClick={() => {
            void awaitUserTurn();
          }}
          size="lg"
          variant="light"
          w="min-content"
        >
          Await user turns
        </Button>
        <p.form
          alignItems="end"
          display="grid"
          gap="10px"
          gridTemplateColumns="80px 1fr 130px"
          onSubmit={(e) => {
            e.preventDefault();
            void sendItem();
          }}
        >
          <NumberInput
            disabled
            label="User ID"
            size="lg"
            value={userId ?? ""}
          />
          <TextInput
            disabled={disabled}
            label="Word"
            onChange={(e) => {
              setWord(e.currentTarget.value);
            }}
            size="lg"
            value={word ?? ""}
          />
          <Button
            disabled={disabled || !word.length}
            loaderProps={{
              size: "sm",
            }}
            loading={actionLoading === "SEND"}
            size="lg"
            type="submit"
          >
            Send
          </Button>
        </p.form>
      </Section>
    </Section>
  );
}
