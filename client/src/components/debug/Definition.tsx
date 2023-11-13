import { TextInput, NumberInput, Button, Popover, Select } from "@mantine/core";
import { mdiCheck } from "@mdi/js";
import Icon from "@mdi/react";
import { useAtom, useSetAtom } from "jotai";
import { type ReactElement, useState } from "react";
import { styled as p } from "panda/jsx";
import { Room } from "@/lib/room";
import { getHonoClient, useRooms } from "@/hooks/useRooms";
import { Section } from "./Section";
import {
  atomAPIurlRoom,
  atomAPIurlWord2vec,
  atomUserId,
  atomRoomId,
  atomActionStatus,
} from "@/lib/store/data";

export function Definition(): ReactElement {
  const STATUS_LIST = ["INVITATION", "PLAYING", "FINISHED", "TEST"] as const;

  const [apiUrlRoom, setAPIUrlRoom] = useAtom(atomAPIurlRoom);
  const [apiUrlWord2vec, setAPIUrlWord2vec] = useAtom(atomAPIurlWord2vec);
  const [userId, setUserId] = useAtom(atomUserId);
  const [roomId, setRoomId] = useAtom(atomRoomId);
  const setActionStatus = useSetAtom(atomActionStatus);

  const roomClient = getHonoClient(apiUrlRoom);
  const rooms = useRooms(roomClient);

  const [userName, setUserName] = useState<string>();
  const [status, setStatus] = useState<(typeof STATUS_LIST)[number]>();
  const [statusOpened, setStatusOpened] = useState(false);
  const [actionLoading, setActionLoading] = useState<
    "STATUS" | "SEND" | "AUTO_CREATE" | "CREATE_USER"
  >();

  async function createUserWidthRoom(): Promise<void> {
    if (roomId == null || userName == null) {
      setActionStatus({
        message: "roomId or userName is empty",
        from: "createUserWidthRoom",
        status: "error",
      });
      return;
    }

    setActionLoading("CREATE_USER");

    void rooms
      .join(roomId, { name: userName })
      .then(({ userId: _userId }) => {
        setUserId(_userId);
        setActionStatus({
          message: `Created user! userId: ${_userId}`,
          from: "createUserWidthRoom",
          status: "success",
        });
      })
      .catch((e) => {
        console.error(e);
        setActionStatus({
          message: e.message,
          from: "createUserWidthRoom",
          status: "error",
        });
      })
      .finally(() => {
        setActionLoading(undefined);
      });
  }

  async function updateStatus(): Promise<void> {
    if (roomId == null || userId == null || status == null) {
      setActionStatus({
        message: "roomId or userId or status is null",
        from: "updateStatus",
        status: "error",
      });
      return;
    }

    const room = new Room(roomId, userId, roomClient);

    setActionStatus({
      message: "Updating status...",
      from: "updateStatus",
      status: "loading",
    });
    setActionLoading("STATUS");

    void room
      .updateStatus({ status })
      .catch((e) => {
        console.error(e);
        setActionStatus({
          message: e.message,
          from: "updateStatus",
          status: "error",
        });
      })
      .finally(() => {
        setActionLoading(undefined);
      });
  }

  async function autoCreate(): Promise<void> {
    if (userName === "") {
      setActionStatus({
        message: "userName is empty",
        from: "autoCreate",
        status: "error",
      });
      return;
    }

    setActionStatus({
      message: "Auto creating...",
      from: "autoCreate",
      status: "loading",
    });
    setActionLoading("AUTO_CREATE");

    void rooms
      .create({
        name: "test",
      })
      .then(({ roomId: _roomId, userId: _userId }) => {
        setRoomId(_roomId);
        setUserId(_userId);
        setActionStatus({
          message: `Auto created! roomId: ${_roomId}, userId: ${_userId}`,
          from: "autoCreate",
          status: "success",
        });
      })
      .catch((e) => {
        console.error(e);
        setActionStatus({
          message: e.message,
          from: "autoCreate",
          status: "error",
        });
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
