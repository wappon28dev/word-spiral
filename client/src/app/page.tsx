"use client";

import { useState, type ReactElement, useEffect } from "react";
import { styled as p } from "panda/jsx";
import { useAtom } from "jotai";
import { Button, Divider } from "@mantine/core";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";
import { type PropertyValue } from "panda/types/prop-type";
import { type Token, token } from "panda/tokens";
import { useWords } from "@/hooks/useWords";
import { requestWithActionStatus } from "@/lib/request";
import { atomActionStatus, atomWords } from "@/lib/store/data";
import { type ActionStatus } from "@/types/atom/data";

export default function Page(): ReactElement {
  const { getWords } = useWords();

  const [actionStatus, setActionStatus] = useAtom(atomActionStatus);

  const [words, setWords] = useAtom(atomWords);
  const [isLoading, setIsLoading] = useState(false);

  const color: Record<ActionStatus["status"], PropertyValue<"color">> = {
    success: "green.500",
    warning: "yellow.900",
    error: "red.500",
    loading: "blue.500",
  } as const;

  function getColorToken(): string {
    if (actionStatus == null) return "colors.black";
    const colors = `colors.${color[actionStatus.status]}` as Token;
    return token.var(colors);
  }

  async function requestWords(): Promise<void> {
    await requestWithActionStatus({
      requestInfo: {
        from: "onClick",
        message: "getting words",
        setActionStatus,
      },

      request: getWords(),

      onRequestBefore: () => {
        setIsLoading(true);
      },
      onSucceeded: (data) => {
        setWords(data);
      },
      onRequestAfter: () => {
        setIsLoading(false);
      },
    });
  }

  useEffect(() => {
    const _isProd = process.env.NODE_ENV === "production";
    if (_isProd) {
      void requestWords();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <p.main
      display="grid"
      gridTemplateColumns="100%"
      gridTemplateRows="1fr auto"
      minH="100vh"
    >
      <p.article
        display="flex"
        flexDir="column"
        gap="40px"
        m="0 auto"
        maxW="1200px"
        p={{
          base: "0",
          sm: "20px",
        }}
        w="100%"
      >
        <p.div display="flex" flexDir="column" gap="20px">
          <p.p
            fontSize="3xl"
            fontWeight="900"
            onClick={() => {
              void requestWords();
            }}
            textAlign="center"
          >
            コトバのレンサ
          </p.p>
          <p.div display="flex" gap="40px" justifyContent="center">
            <p.div bg="gray.200" h="200px" rounded="md" w="200px" />
            <p.div bg="gray.200" h="200px" rounded="md" w="200px" />
            <p.div bg="gray.200" h="200px" rounded="md" w="200px" />
          </p.div>
        </p.div>
        <p.div textAlign="center">
          <Button
            disabled={!isLoading && words == null}
            loading={isLoading}
            rightIcon={<Icon path={mdiArrowRight} size={1} />}
            size="lg"
          >
            はじめる
          </Button>
        </p.div>
      </p.article>
      <p.footer p="20px">
        <Divider size="sm" />
        <p.div>
          {actionStatus != null ? (
            <>
              <p.span color="gray.400">{actionStatus.from}:&nbsp;</p.span>
              <p.span
                style={{
                  color: getColorToken(),
                }}
              >
                {actionStatus.message}
              </p.span>
            </>
          ) : (
            <p.p color="green.500">READY</p.p>
          )}
        </p.div>
      </p.footer>
    </p.main>
  );
}
