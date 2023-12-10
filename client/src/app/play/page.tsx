"use client";

import { useEffect, type ReactElement } from "react";
import { styled as p } from "panda/jsx";
import { useAtomValue } from "jotai";
import useViewTransitionRouter from "@/hooks/useViewTransitionRouter";
import { PredictWordSelect } from "@/components/play/PredictWordSelect";
import WordPredict from "@/components/play/Result";
import { TargetWordSelect } from "@/components/play/TargetWordSelect";
import { atomWords } from "@/lib/store/data";
import { Status } from "@/components/Status";

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
    <p.main
      display="grid"
      gridTemplateColumns="100%"
      gridTemplateRows="1fr auto"
      minH="100vh"
    >
      <p.article display="grid" gridTemplateColumns="2fr 4fr 2fr">
        <p.div bg="blue.100">
          <TargetWordSelect />
        </p.div>
        <p.div bg="red.100">
          <PredictWordSelect />
        </p.div>
        <p.div bg="green.100">
          <WordPredict />
        </p.div>
      </p.article>
      <p.footer p="20px">
        <Status />
      </p.footer>
    </p.main>
  );
}
