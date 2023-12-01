import { type ReactElement, type ReactNode } from "react";

import { styled as p } from "panda/jsx";
import { mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";

export function Button({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: ReactNode;
}): ReactElement {
  return (
    <p.p
      _hover={{
        cursor: "pointer",
        bg: "gray.200",
        "& > span:last-child": {
          transform: "translateX(3px)",
        },
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
      textAlign="center"
      transition="transform 0.2s ease-in-out"
      w="100%"
    >
      <p.span m="0 auto" textAlign="center">
        {children}
      </p.span>
      <p.span transition="all 0.2s ease-in-out">
        <Icon path={mdiChevronRight} size={1} />
      </p.span>
    </p.p>
  );
}
