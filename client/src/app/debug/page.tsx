/* eslint-disable no-console */

"use client";

import { type ReactNode, type ReactElement, useState } from "react";
import { styled as p } from "panda/jsx";
import packageJson from "package";
import {
  Button,
  Divider,
  NumberInput,
  Popover,
  TextInput,
  Select,
} from "@mantine/core";
import { type PropertyValue } from "panda/types/prop-type";
import { useAtom } from "jotai";
import Icon from "@mdi/react";
import { mdiCheck } from "@mdi/js";
import { siteId } from "@/assets/info";
import { getHonoClient, useRooms } from "@/hooks/useRooms";
import { Room } from "@/lib/room";
import {
  atomAPIurlRoom,
  atomAPIurlWord2vec,
  atomRoomId,
  atomUserId,
} from "@/lib/store/data";

function Section({
  name,
  gap,
  bg,
  children,
}: {
  name: string;
  gap?: PropertyValue<"gap">;
  bg?: PropertyValue<"bg">;
  children: ReactNode;
}): ReactElement {
  return (
    <p.section
      bg={bg ?? "white"}
      border="2px solid gray"
      display="flex"
      flexDir="column"
      gap={gap ?? "10px"}
      p="20px"
      rounded="2xl"
    >
      <p.h2 fontSize="2xl" fontWeight="bold">
        {name}
      </p.h2>

      {children}
    </p.section>
  );
}

export default function PageDebug(): ReactElement {
  const [apiUrlRoom, setAPIUrlRoom] = useAtom(atomAPIurlRoom);
  const [apiUrlWord2vec, setAPIUrlWord2vec] = useAtom(atomAPIurlWord2vec);
  const [userId, setUserId] = useAtom(atomUserId);
  const [roomId, setRoomId] = useAtom(atomRoomId);
  const [actionStatus, setActionStatus] = useState<string>();
  const [actionLoading, setActionLoading] = useState<
    "STATUS" | "AWAIT" | "SEND" | "AUTO_CREATE" | "CREATE_USER"
  >();

  const roomClient = getHonoClient(apiUrlRoom);
  const rooms = useRooms(roomClient);

  function Definition(): ReactElement {
    const STATUS_LIST = ["INVITATION", "PLAYING", "FINISHED", "TEST"] as const;

    const [userName, setUserName] = useState<string>();
    const [status, setStatus] = useState<(typeof STATUS_LIST)[number]>();
    const [statusOpened, setStatusOpened] = useState(false);

    async function createUserWidthRoom(): Promise<void> {
      if (roomId == null || userName == null) {
        setActionStatus(
          "Error occurred in createUserWidthRoom: roomId or userName is empty"
        );
        return;
      }

      setActionStatus("Creating user...");
      setActionLoading("CREATE_USER");

      void rooms
        .join(roomId, { name: userName })
        .then(({ userId: _userId }) => {
          setUserId(_userId);
          setActionStatus(`Created user! userId: ${_userId}`);
        })
        .catch((e) => {
          console.error(e);
          setActionStatus(
            `Error occurred in createUserWidthRoom: ${e.message}`
          );
        })
        .finally(() => {
          setActionLoading(undefined);
        });
    }

    async function updateStatus(): Promise<void> {
      if (roomId == null || userId == null || status == null) {
        setActionStatus(
          "Error occurred in updateStatus: roomId or userId or status is null"
        );
        return;
      }

      const room = new Room(roomId, userId, roomClient);

      setActionStatus("Updating status...");
      setActionLoading("STATUS");

      void room
        .updateStatus({ status })
        .catch((e) => {
          console.error(e);
          setActionStatus(`Error occurred in updateStatus: ${e.message}`);
        })
        .finally(() => {
          setActionLoading(undefined);
        });
    }

    async function autoCreate(): Promise<void> {
      if (userName === "") {
        setActionStatus("Error occurred in autoCreate: userName is empty");
        return;
      }

      setActionStatus("Auto creating...");
      setActionLoading("AUTO_CREATE");

      void rooms
        .create({
          name: "test",
        })
        .then(({ roomId: _roomId, userId: _userId }) => {
          setRoomId(_roomId);
          setUserId(_userId);
          setActionStatus(
            `Auto created! roomId: ${_roomId}, userId: ${_userId}`
          );
        })
        .catch((e) => {
          console.error(e);
          setActionStatus(`Error occurred in autoCreate: ${e.message}`);
        })
        .finally(() => {
          setActionLoading(undefined);
        });
    }
    return (
      <Section bg="blue.100" name="Definition">
        <Section name="API">
          <p.div display="flex" flexDir="column" gap="10px">
            <TextInput
              label="Room API End Point"
              onChange={(e) => {
                setAPIUrlRoom(e.currentTarget.value);
              }}
              size="lg"
              value={apiUrlRoom}
            />
            <TextInput
              label="word2vec API End Point"
              onChange={(e) => {
                setAPIUrlWord2vec(e.currentTarget.value);
              }}
              size="lg"
              value={apiUrlWord2vec}
            />
          </p.div>
        </Section>
        <Section name="User">
          <p.div display="grid" gap="10px" gridTemplateColumns="60px 1fr 100px">
            <NumberInput
              disabled
              label="ID"
              noClampOnBlur
              onChange={(e) => {
                setUserId(e === "" ? undefined : e);
              }}
              size="lg"
              value={userId ?? ""}
            />
            <TextInput
              label="Name"
              onChange={(e) => {
                setUserName(e.currentTarget.value);
              }}
              size="lg"
              value={userName ?? ""}
            />
            <NumberInput
              label="Room ID"
              onChange={(e) => {
                setRoomId(e === "" ? undefined : e);
              }}
              size="lg"
              value={roomId ?? ""}
            />
          </p.div>
          <p.div display="flex" gap="10px">
            <Button color="red" disabled fullWidth size="lg" variant="light">
              Delete
            </Button>
            <Button color="grape" disabled fullWidth size="lg" variant="light">
              Update
            </Button>
            <Button
              color="blue"
              disabled={roomId == null || userName == null}
              fullWidth
              onClick={() => {
                void createUserWidthRoom();
              }}
              size="lg"
              variant="light"
            >
              Create & Join
            </Button>
          </p.div>

          <p.h2 fontSize="2xl" fontWeight="bold">
            Room
          </p.h2>
          <p.div
            alignItems="end"
            display="grid"
            gap="10px"
            gridTemplateColumns="60px repeat(3, 1fr)"
          >
            <NumberInput disabled label="ID" size="lg" value={roomId} />
            <Button
              color="red"
              disabled={userId == null || roomId == null}
              fullWidth
              size="lg"
              variant="light"
            >
              Delete
            </Button>
            <Popover
              onChange={setStatusOpened}
              opened={statusOpened}
              position="top"
              shadow="md"
              width={200}
              withArrow
            >
              <Popover.Target>
                <Button
                  color="grape"
                  disabled={userId == null || roomId == null}
                  fullWidth
                  loading={actionLoading === "STATUS"}
                  onClick={() => {
                    setStatusOpened(!statusOpened);
                  }}
                  size="lg"
                  variant="light"
                >
                  Update Status
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <p.div
                  alignItems="center"
                  display="flex"
                  flexDir="column"
                  gap="10px"
                >
                  <Select
                    // data={zRoom.shape.status.options.map((o) => o.value)}
                    data={STATUS_LIST}
                    label="Select status"
                    onChange={(val) => {
                      if (val == null) return;
                      const _val = val as (typeof STATUS_LIST)[number];
                      setStatus(_val);
                    }}
                    value={status ?? ""}
                  />
                  <Button
                    color="grape"
                    disabled={status == null}
                    leftIcon={<Icon path={mdiCheck} size={1} />}
                    onClick={() => {
                      setStatusOpened(false);
                      void updateStatus();
                    }}
                    variant="filled"
                  >
                    Update
                  </Button>
                </p.div>
              </Popover.Dropdown>
            </Popover>
            <Button
              color="blue"
              disabled={userName == null}
              fullWidth
              loading={actionLoading === "AUTO_CREATE"}
              onClick={() => {
                void autoCreate();
              }}
              size="lg"
              variant="light"
            >
              Auto Create
            </Button>
          </p.div>
        </Section>
      </Section>
    );
  }

  function Status(): ReactElement {
    return (
      <Section bg="red.100" name="Status">
        <Section name="User">wa</Section>
        <Section name="Room">wa</Section>
      </Section>
    );
  }

  function Action(): ReactElement {
    const [word, setWord] = useState<string>("");
    const disabled = roomId == null || userId == null;

    const awaitUserTurn = async (): Promise<void> => {
      if (disabled) return;
      const room = new Room(roomId, userId, roomClient);

      setActionStatus("Awaiting user turns...");
      setActionLoading("AWAIT");

      void room
        .awaitUserTurns()
        .then(() => {
          setActionStatus("It's your turn!");
        })
        .catch((e) => {
          console.error(e);
          setActionStatus(`Error occurred in awaitUserTurns: ${e.message}`);
        })
        .finally(() => {
          setActionLoading(undefined);
        });
    };

    const sendItem = async (): Promise<void> => {
      if (disabled || word === "") return;
      const room = new Room(roomId, userId, roomClient);

      setActionStatus("Sending item...");
      setActionLoading("SEND");

      void room
        .addItem({ word })
        .then(() => {
          setWord("");
        })
        .catch((e) => {
          console.error(e);
          setActionStatus(`Error occurred in sendItem: ${e.message}`);
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

  return (
    <p.div
      display="grid"
      gridTemplateColumns="100%"
      gridTemplateRows="1fr auto"
      minH="100vh"
    >
      <p.div overflowY="auto" w="100%">
        <p.div p="20px">
          <p.div
            alignItems="center"
            display="flex"
            justifyContent="space-between"
          >
            <p.h1 fontSize="3xl" fontWeight="black">
              Debug Mode
            </p.h1>
            <p.p>
              {siteId} v{packageJson.version}
            </p.p>
          </p.div>
          <p.div p="5px 0" pb="20px">
            <Divider size="md" />
          </p.div>
          <p.article h="100%">
            <p.div
              display="grid"
              gap="10px"
              gridTemplateColumns="repeat(auto-fit, minmax(590px, 1fr))"
              w="100%"
            >
              <Definition />
              <p.div display="grid" gap="10px" gridTemplateRows="1fr 1fr">
                <Status />
                <Action />
              </p.div>
            </p.div>
          </p.article>
        </p.div>
      </p.div>
      <p.footer bg="white" bottom="0" p="20px" position="float" w="100%">
        <Divider size="md" />
        <p.p color="gray">{actionStatus ?? "READY"}</p.p>
      </p.footer>
    </p.div>
  );
}
