// ref: https://github.com/vercel/next.js/discussions/46300#discussioncomment-6084177

import { useSetAtom } from "jotai";
import { useRouter as useNextRouter, usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { atomIsLoading, loadingComplete } from "@/lib/store/ui";
import transitionHelper from "@/lib/helpers/transition";

export default function useViewTransitionRouter(): ReturnType<
  typeof useNextRouter
> {
  const router = useNextRouter();
  const pathname = usePathname();
  const setLoading = useSetAtom(atomIsLoading);

  const promiseCallbacks = useRef<Record<
    "resolve" | "reject",
    (value: unknown) => void
  > | null>(null);

  useLayoutEffect(
    () => () => {
      if (promiseCallbacks.current != null) {
        loadingComplete(setLoading);
        promiseCallbacks.current.resolve(undefined);
        promiseCallbacks.current = null;
      }
    },
    [pathname, setLoading]
  );

  return {
    ...router,
    back: () => {
      transitionHelper({
        updateDOM: () => {
          router.back();
        },
      });
    },
    forward: () => {
      transitionHelper({
        updateDOM: () => {
          router.forward();
        },
      });
    },
    push: (...args: Parameters<typeof router.push>) => {
      transitionHelper({
        updateDOM: async () => {
          const url = args[0];
          if (url === pathname) {
            router.push(...args);
          }
          await new Promise((resolve, reject) => {
            promiseCallbacks.current = { resolve, reject };
            router.push(...args);
          });
        },
      });
    },
    replace: (...args: Parameters<typeof router.replace>) => {
      transitionHelper({
        updateDOM: () => {
          router.replace(...args);
        },
      });
    },
  };
}
