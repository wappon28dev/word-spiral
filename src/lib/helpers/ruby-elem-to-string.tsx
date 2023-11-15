import { type ReactElement } from "react";

type RubyProps = {
  rb: string;
  rt: string;
};

export type RubyElem = {
  props:
    | {
        children: Array<{ props: RubyProps } | string> | string;
      }
    | RubyProps;
};

function isRubyProps(props: RubyElem["props"]): props is RubyProps {
  return "rb" in props && "rt" in props;
}

export function rubyElemToText(elem: ReactElement, showRb = true): string {
  const { props } = elem as RubyElem;

  if (isRubyProps(props)) {
    console.log(`rubyElemToText: ${JSON.stringify(props)}`);
    return showRb ? props.rb : props.rt;
  }

  const { children } = props;

  if (typeof children === "string") {
    return children;
  }

  const text = children
    .map((child) => {
      if (typeof child === "string") {
        return child;
      }

      const { props: _props } = child;
      const { rb, rt } = _props;
      return showRb ? rb : rt;
    })
    .join("");

  return text;
}

export const a = "1";
