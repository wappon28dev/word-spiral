"use client";

import { type ReactElement } from "react";
import { styled as p } from "panda/jsx";

export default function Page(): ReactElement {
  return (
    <p.main display="grid" h="100%" placeItems="center" w="100%">
      <p.div>こんにちは</p.div>
    </p.main>
  );
}
