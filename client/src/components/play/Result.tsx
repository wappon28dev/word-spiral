import { type ReactElement } from "react";

import { styled as p } from "panda/jsx";

export default function Result(): ReactElement {
  return (
    <p.div bg="green.100" h="100%" w="100%">
      <p.h2 fontSize="3xl" fontWeight="900" p="20px" textAlign="center">
        単語を選択
      </p.h2>
    </p.div>
  );
}
