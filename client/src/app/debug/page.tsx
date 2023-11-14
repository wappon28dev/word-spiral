/* eslint-disable no-console */

"use client";

import { type ReactElement } from "react";
import { styled as p } from "panda/jsx";
import packageJson from "package";
import { Divider } from "@mantine/core";
import { useAtomValue } from "jotai";
import { type PropertyValue } from "panda/types/prop-type";
import { token, type Token } from "panda/tokens";
import { siteId } from "@/assets/info";
import { atomActionStatus } from "@/lib/store/data";
import { Status } from "@/components/debug/Status";
import { Action } from "@/components/debug/Action";
import { Definition } from "@/components/debug/Definition";
import { type ActionStatus } from "@/types/atom/data";

export default function PageDebug(): ReactElement {
  const actionStatus = useAtomValue(atomActionStatus);

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

  return (
    <p.div
      display="grid"
      gridTemplateColumns="100%"
      gridTemplateRows="1fr auto"
      minH="100vh"
    >
      <p.div w="100%">
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
              <p.div display="flex" flexDir="column" gap="10px">
                <Definition />
                <Action />
              </p.div>
              <p.div>
                <Status />
              </p.div>
            </p.div>
          </p.article>
        </p.div>
      </p.div>
    </p.div>
  );
}
