import { nprogress } from "@mantine/nprogress";
import { type ViewTransition } from "@/types/app";

type TransitionHelperArg = {
  skipTransition?: boolean;
  classNames?: string[];
  updateDOM: () => Promise<void> | void;
};

export default function transitionHelper({
  skipTransition = false,
  classNames = [],
  updateDOM,
}: TransitionHelperArg): ViewTransition {
  nprogress.reset();
  nprogress.set(0.5);
  nprogress.start();

  if (skipTransition || document.startViewTransition == null) {
    const updateCallbackDone = Promise.resolve(updateDOM()).then(() => {
      nprogress.complete();
    });
    const ready = Promise.reject(Error("View transitions unsupported"));

    // Avoid spamming the console with this error unless the promise is used.
    ready.catch(() => {});

    return {
      ready,
      updateCallbackDone,
      finished: updateCallbackDone,
      skipTransition: () => {},
    };
  }

  document.documentElement.classList.add(...classNames);
  const transition = document.startViewTransition(updateDOM);

  void transition.finished.finally(() => {
    nprogress.complete();
    document.documentElement.classList.remove(...classNames);
  });

  return {
    ...transition,
    skipTransition: () => undefined,
  };
}
