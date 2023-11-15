import { type ReactNode, type ReactElement } from "react";
import { styled as p } from "panda/jsx";
import { type PropertyValue } from "panda/types/prop-type";

export function Section({
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
