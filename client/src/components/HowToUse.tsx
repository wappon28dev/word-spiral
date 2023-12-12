import { ReactElement } from "react";
import { styled as p } from "panda/jsx/factory";

export function HowToUse(): ReactElement {
  return (
    <p.div display="flex" gap="40px" justifyContent="center">
      <p.div bg="gray.200" rounded="md" textAlign="center" padding="20px">
        <p.img src="https://loosedrawing.com/assets/illustrations/png/1350.png" />
        <p.div>
          <p.p>1.</p.p>
          <p.p>目標単語を選択</p.p>
        </p.div>
      </p.div>
      <p.div bg="gray.200" rounded="md" padding="20px" textAlign="center">
        <p.img src="https://loosedrawing.com/assets/illustrations/png/1202.png" />
        <p.p>2.</p.p>
        <p.p>
          目標単語に関連する<br></br>単語を選択
        </p.p>
      </p.div>
      <p.div bg="gray.200" rounded="md" padding="20px" textAlign="center">
        <p.img src="https://loosedrawing.com/assets/illustrations/png/1484.png" />
        <p.p>3.</p.p>
        <p.p>
          AIがその単語から<br></br>何を連想するかを<br></br>楽しもう
        </p.p>
      </p.div>
    </p.div>
  );
}
