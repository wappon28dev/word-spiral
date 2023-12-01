import { type ReactElement, type ReactNode } from "react";

import { styled as p } from "panda/jsx";
import { mdiCheck } from "@mdi/js";
import Icon from "@mdi/react";
import { token } from "panda/tokens";

export function CheckButton({
  onClick,
  isChecked,
  children,
}: {
  isChecked: boolean;
  onClick?: () => void;
  children: ReactNode;
}): ReactElement {
  return (
    <p.p
      _hover={{
        cursor: "pointer",
        bg: "gray.200",
      }}
      bg="white"
      border="2px solid gray"
      display="flex"
      fontSize="xl"
      justifyContent="space-between"
      m="0 auto"
      onClick={onClick}
      p="20px"
      rounded="20px"
      style={{
        background: token(isChecked ? "colors.green.500" : "colors.white"),
        color: token(isChecked ? "colors.white" : "colors.black"),
      }}
      textAlign="center"
      transition="transform 0.2s ease-in-out, background 0.2s ease-in-out, color 0.2s ease-in-out"
      w="100%"
    >
      <p.span m="0 auto" textAlign="center">
        {children}
      </p.span>
      <p.span color="white">
        <Icon path={mdiCheck} size={1} />
      </p.span>
    </p.p>
  );
}
