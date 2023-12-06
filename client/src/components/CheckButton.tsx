import { type ReactElement, type ReactNode } from "react";

import { styled as p } from "panda/jsx";
import { mdiCheck } from "@mdi/js";
import Icon from "@mdi/react";
import { token } from "panda/tokens";

export function CheckButton({
  onClick,
  isChecked,
  emoji,
  children,
}: {
  isChecked: boolean;
  onClick?: () => void;
  emoji: string;
  children: ReactNode;
}): ReactElement {
  return (
    <p.div
      _active={{
        transform: "translateY(1px)",
      }}
      _hover={{
        cursor: "pointer",
        bg: "gray.200",
      }}
      border="2px solid gray"
      onClick={onClick}
      p="20px"
      position="relative"
      rounded="20px"
      style={{
        background: token(isChecked ? "colors.green.500" : "colors.white"),
        color: token(isChecked ? "colors.white" : "colors.black"),
      }}
      userSelect="none"
      w="100%"
    >
      <p.div className="emoji" fontSize="4xl" textAlign="center">
        {emoji}
      </p.div>
      <p.p fontSize="xl" textAlign="center">
        <p.span m="0 auto" textAlign="center">
          {children}
        </p.span>
      </p.p>
      <p.div
        color="white"
        p="10px"
        position="absolute"
        right="0"
        textAlign="center"
        top="0"
      >
        <Icon path={mdiCheck} size={1} />
      </p.div>
    </p.div>
  );
}
