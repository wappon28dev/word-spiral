import { type ReactElement } from "react";
import { Section } from "./Section";

export function Status(): ReactElement {
  return (
    <Section bg="red.100" name="Status">
      <Section name="User">wa</Section>
      <Section name="Room">wa</Section>
    </Section>
  );
}
