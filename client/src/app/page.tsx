"use client";

import { type ReactElement } from "react";
import packageJson from "package";
import useViewTransitionRouter from "@/hooks/useViewTransitionRouter";
import { styled as p } from "panda/jsx";

export default function Page(): ReactElement {
  const router = useViewTransitionRouter();

  const VERSION = packageJson.version;

  return (
    <p.main h="100%" w="100%">
      <p.div bottom="0" left="0" p="10px" position="absolute">
        v{VERSION}
      </p.div>
    </p.main>
  );
}
