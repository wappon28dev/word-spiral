import { type ReactElement } from "react";
import { styled as p } from "panda/jsx/factory";
import Ruby from "./Ruby";

export function HowToUse(): ReactElement {
  return (
    <p.div display="flex" gap="40px" justifyContent="center">
      <p.div bg="gray.200" padding="20px" rounded="md" textAlign="center">
        <p.img src="https://loosedrawing.com/assets/illustrations/png/1350.png" />
        <p.div>
          <p.p fontSize="lg">1</p.p>
          <p.p fontSize="xl">
            <Ruby rb="予測" rt="よそく" />
            させたい
            <Ruby rb="単語" rt="たんご" />を<Ruby rb="選" rt="えら" />
            ぼう
          </p.p>
        </p.div>
      </p.div>
      <p.div bg="gray.200" padding="20px" rounded="md" textAlign="center">
        <p.img src="https://loosedrawing.com/assets/illustrations/png/1202.png" />
        <p.p fontSize="lg">2</p.p>
        <p.p fontSize="xl">
          その
          <Ruby rb="単語" rt="たんご" />と<Ruby rb="関係" rt="かんけい" />
          する
          <Ruby rb="単語" rt="たんご" />を<Ruby rb="選" rt="えら" />
          ぼう
        </p.p>
      </p.div>
      <p.div bg="gray.200" padding="20px" rounded="md" textAlign="center">
        <p.img src="https://loosedrawing.com/assets/illustrations/png/1484.png" />
        <p.p fontSize="lg">3</p.p>
        <p.p fontSize="xl">
          キミの
          <Ruby rb="選" rt="えら" />
          んだ
          <Ruby rb="単語" rt="たんご" />
          でもとの
          <Ruby rb="単語" rt="たんご" />を<p.br />
          <Ruby rb="生成系" rt="せいせいけい" /> AI に
          <Ruby rb="連想" rt="れんそう" />
          させてみよう
        </p.p>
      </p.div>
    </p.div>
  );
}
