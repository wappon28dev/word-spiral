"use client";

import type React from "react";
import {
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useTransition,
} from "react";

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}): ReactNode {
  const [, startTransition] = useTransition();

  const promiseCallbacks = useRef<Record<
    "resolve" | "reject",
    (value: unknown) => void
  > | null>(null);

  useEffect(() => {
    window.onpopstate = () => {
      document.startViewTransition?.(() => {});
      startTransition(() => {});
    };
  }, []);

  useLayoutEffect(() => () => {
    if (promiseCallbacks.current != null) {
      promiseCallbacks.current.resolve(undefined);
      promiseCallbacks.current = null;
    }
  });

  return children;
}
