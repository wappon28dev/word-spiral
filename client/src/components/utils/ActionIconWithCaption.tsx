import { ActionIcon, type ActionIconProps } from "@mantine/core";
import {
  type ComponentPropsWithRef,
  forwardRef,
  type ReactElement,
} from "react";
import { styled as p } from "panda/jsx";

type ActionIconWithCaptionProps = {
  caption: ReactElement;
  position?: "top" | "bottom";
  onClick?: () => void; // workaround
} & ActionIconProps &
  ComponentPropsWithRef<typeof ActionIcon>;

// FIXME: `ComponentProps<typeof ActionIcon>` returns `never`.

const ActionIconWithCaption = forwardRef<
  HTMLButtonElement,
  ActionIconWithCaptionProps
>(({ caption, ...props }, ref) => {
  const disabled = props.disabled ?? false;
  const position = props.position ?? "bottom";
  const getCaptionComp = (
    <p.p
      color={disabled ? "gray.500" : undefined}
      fontSize="small"
      whiteSpace="nowrap"
    >
      {caption}
    </p.p>
  );

  if (caption == null) {
    return <ActionIcon {...props} />;
  }

  return (
    <p.span
      ref={ref}
      _hover={{
        bg: disabled ? undefined : "gray.100",
      }}
      alignItems="center"
      cursor={disabled ? "not-allowed" : "pointer"}
      display="flex"
      flexDir="column"
      onClick={props.onClick}
      p="10px"
      rounded="md"
      textAlign="center"
      w="100%"
    >
      {position === "top" && getCaptionComp}
      <ActionIcon {...props} onClick={() => {}} variant="transparent" />
      {position === "bottom" && getCaptionComp}
    </p.span>
  );
});

ActionIconWithCaption.displayName = "ActionIconWithCaption";
export default ActionIconWithCaption;
