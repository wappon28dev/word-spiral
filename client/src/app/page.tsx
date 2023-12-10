"use client";

import { useState, type ReactElement, useEffect } from "react";
import { styled as p } from "panda/jsx";
import { useAtom, useSetAtom } from "jotai";
import { Button } from "@mantine/core";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";
import { useWords } from "@/hooks/useWords";
import { requestWithActionStatus } from "@/lib/request";
import { atomActionStatus, atomWords } from "@/lib/store/data";
import useViewTransitionRouter from "@/hooks/useViewTransitionRouter";
import { Status } from "@/components/Status";

export default function Page(): ReactElement {
  const { getWords, getWordsMock } = useWords();
  const router = useViewTransitionRouter();

  const setActionStatus = useSetAtom(atomActionStatus);

  const [words, setWords] = useAtom(atomWords);
  const [isLoading, setIsLoading] = useState(false);

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
    } else {
      getWordsMock().then((m) => {
        setActionStatus({
          from: "getWordsMock",
          message: "success",
          status: "success",
        });
        setWords(m);
      });
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
            onClick={() => {
              router.push("/play");
            }}
            rightIcon={<Icon path={mdiArrowRight} size={1} />}
            size="lg"
          >
            はじめる
          </Button>
        </p.div>
      </p.article>
      <p.footer p="20px">
        <Status />
      </p.footer>
    </p.main>
  );
}
