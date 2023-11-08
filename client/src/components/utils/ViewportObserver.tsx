import { useViewportSize } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { mdiArrowExpandHorizontal, mdiArrowExpandVertical } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
import { type ReactElement } from "react";
import { styled as p } from "panda/jsx";
import Ruby from "../Ruby";

export default function ViewPortObserver(): ReactElement {
  const { height, width } = useViewportSize();
  const [noticed, setNoticed] = useState({
    height: false,
    width: false,
  });

  const minHeight = {
    id: "low-height-warning",
    px: 600,
  } as const;

  const minWidth = {
    id: "low-width-warning",
    px: 900,
  } as const;

  useEffect(() => {
    // マウント時に height と width が 0 になるのでそれを除外
    if (height === 0 || width === 0) return;

    if (height < minHeight.px && !noticed.height) {
      notifications.show({
        id: minHeight.id,
        title: (
          <>
            <Ruby rb="縦幅" rt="よこはば" />が<Ruby rb="狭" rt="せま" />
            すぎます
          </>
        ),
        message: (
          <>
            {minHeight.px}px
            <Ruby rb="以下" rt="いか" />
            ではコンテンツが
            <Ruby rb="正" rt="ただ" />
            しく
            <Ruby rb="表示" rt="ひょうじ" />
            されない
            <Ruby rb="可能性" rt="かのうせい" />
            があります.
          </>
        ),
        icon: <Icon path={mdiArrowExpandVertical} size={0.8} />,
        color: "red",
        autoClose: false,
        withBorder: true,
      });
      setNoticed((prev) => ({ ...prev, height: true }));
    } else if (height >= minHeight.px && noticed.height) {
      notifications.hide(minHeight.id);
      setNoticed((prev) => ({ ...prev, height: false }));
    }

    if (width < minWidth.px && !noticed.width) {
      notifications.show({
        id: minWidth.id,
        title: (
          <>
            <Ruby rb="横幅" rt="よこはば" />が
            <Ruby rb="狭" rt="せま" />
            すぎます
          </>
        ),
        message: (
          <>
            {minWidth.px}px
            <Ruby rb="以下" rt="いか" />
            ではコンテンツが
            <Ruby rb="正" rt="ただ" />
            しく
            <Ruby rb="表示" rt="ひょうじ" />
            されない
            <Ruby rb="可能性" rt="かのうせい" />
            があります.
          </>
        ),
        icon: <Icon path={mdiArrowExpandHorizontal} size={0.8} />,
        color: "red",
        autoClose: false,
        withBorder: true,
      });
      setNoticed((prev) => ({ ...prev, width: true }));
    } else if (width >= minWidth.px && noticed.width) {
      notifications.hide(minWidth.id);
      setNoticed((prev) => ({ ...prev, width: false }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, noticed.height, noticed.width, width]);

  return <p.div />;
}
