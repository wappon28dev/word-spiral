import { type SetStateAction } from "jotai";
import { type Dispatch } from "react";
import { type ActionStatus } from "@/types/atom/data";

type Props<T> = {
  requestInfo: {
    from: string;
    message: string;
    setActionStatus: Dispatch<SetStateAction<ActionStatus | undefined>>;
  };

  request: Promise<T>;

  // hooks
  onRequestBefore?: () => void;
  onSucceeded: (data: T) => void;
  onRequestAfter?: () => void;
  onFailed?: () => void;
};

export async function requestWithActionStatus<T>({
  requestInfo,

  request,
  onRequestBefore,
  onSucceeded,
  onRequestAfter,
  onFailed,
}: Props<T>): Promise<void> {
  const { from, message, setActionStatus } = requestInfo;

  setActionStatus({
    message: `${message}...`,
    from,
    status: "loading",
  });
  onRequestBefore?.();

  void request
    .then((data) => {
      onSucceeded(data);
      setActionStatus({
        message: `Succeeded ${message}, data: ${JSON.stringify(data)}`,
        from,
        status: "success",
      });
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      setActionStatus({
        message: `Failed ${message}: ${err.message}`,
        from,
        status: "error",
      });
      onFailed?.();
    })
    .finally(onRequestAfter);
}
