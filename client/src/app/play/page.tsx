"use client";

import { useEffect, type ReactElement } from "react";
import { styled as p } from "panda/jsx";
import { useAtomValue } from "jotai";
import useViewTransitionRouter from "@/hooks/useViewTransitionRouter";
import { PredictWordSelect } from "@/components/play/PredictWordSelect";
import WordPredict from "@/components/play/Result";
import { TargetWordSelect } from "@/components/play/TargetWordSelect";
import { atomWords } from "@/lib/store/data";

export default function PagePlay(): ReactElement {
  const words = useAtomValue(atomWords);
  const router = useViewTransitionRouter();

  useEffect(() => {
    if (words == null) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <p.div h="100%" w="100%">
      <p.main
        display="grid"
        gridTemplateColumns="1fr 2fr 1fr"
        h="100%"
        w="100%"
      >
        <p.div bg="blue.100" flex="3">
          <TargetWordSelect />
        </p.div>
        <p.div bg="red.100" flex="5">
          <PredictWordSelect />
        </p.div>
        <p.div>
          <WordPredict />
        </p.div>
      </p.main>
    </p.div>
  );
}
