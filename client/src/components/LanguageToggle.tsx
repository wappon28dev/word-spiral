import { SegmentedControl, type SegmentedControlItem } from "@mantine/core";
import { type ReactElement } from "react";
import { useAtom } from "jotai";
import { type Lang } from "types/lang";
import { atomLang } from "@/lib/store/ui";
import { Emoji } from "./Emoji";

export function LanguageToggle(): ReactElement {
  const [lang, setLang] = useAtom(atomLang);

  const applyLangChanged = (value: string): void => {
    const key = value as Lang;
    setLang(key);
  };

  const data: SegmentedControlItem[] = [
    {
      label: (
        <>
          <Emoji emoji="jp" /> 日本語
        </>
      ),
      value: "ja-jp",
    },
    {
      label: (
        <>
          <Emoji emoji="us" /> English
        </>
      ),
      value: "en-us",
    },
  ];
  return (
    <SegmentedControl data={data} onChange={applyLangChanged} value={lang} />
  );
}
