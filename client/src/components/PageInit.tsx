"use client";

import { nprogress, NavigationProgress } from "@mantine/nprogress";
import { useSetAtom } from "jotai";
import {
  type ReactElement,
  useEffect,
  useLayoutEffect,
  type ReactNode,
} from "react";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { atomIsLoading, loadingComplete } from "@/lib/store/ui";
import TransitionProvider from "@/components/utils/TransitionProvider";
import Loading from "@/components/Loading";
import ViewPortObserver from "./utils/ViewportObserver";

export default function PageInit({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const setIsLoading = useSetAtom(atomIsLoading);

  useLayoutEffect(() => {
    nprogress.start();
  }, []);

  useEffect(() => {
    loadingComplete(setIsLoading);
  }, [setIsLoading]);

  return (
    <>
      <NavigationProgress zIndex={100} />
      <MantineProvider theme={{ fontFamily: "inherit" }}>
        <Notifications />
        <ViewPortObserver />
        <TransitionProvider>{children}</TransitionProvider>
      </MantineProvider>
      <Loading />
    </>
  );
}
