import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { type ReactElement } from "react";
import useViewTransitionRouter from "@/hooks/useViewTransitionRouter";

type AnchorProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof NextLinkProps
>;

type LinkProps = {
  children: React.ReactNode;
} & AnchorProps &
  NextLinkProps;

export default function Link({ ...props }: LinkProps): ReactElement {
  const router = useViewTransitionRouter();

  function handleLinkClick(e: React.MouseEvent<HTMLAnchorElement>): void {
    e.preventDefault();
    router.push(props.href.toString());
  }

  return (
    <NextLink
      {...props}
      onClick={(e) => {
        handleLinkClick(e);
      }}
    />
  );
}
