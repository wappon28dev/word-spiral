import { type ReactElement } from "react";
import { styled as p } from "panda/jsx";
import { Divider } from "@mantine/core";
import { type PropertyValue } from "panda/types/prop-type";
import { useAtomValue } from "jotai";
import { type Token, token } from "panda/tokens";
import { type ActionStatus } from "@/types/atom/data";
import { atomActionStatus } from "@/lib/store/data";

export function Status(): ReactElement {
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
    <>
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
    </>
  );
}
