"use client";

import { type ReactNode, type ReactElement } from "react";
import { styled as p } from "panda/jsx";
import packageJson from "package";
import { Button, Divider, NumberInput, TextInput } from "@mantine/core";
import { type PropertyValue } from "panda/types/prop-type";
import { siteId } from "@/assets/info";

function Section({
  name,
  gap,
  bg,
  children,
}: {
  name: string;
  gap?: PropertyValue<"gap">;
  bg?: PropertyValue<"bg">;
  children: ReactNode;
}): ReactElement {
  return (
    <p.section
      bg={bg ?? "white"}
      border="2px solid gray"
      display="flex"
      flexDir="column"
      gap={gap ?? "10px"}
      p="20px"
      rounded="2xl"
    >
      <p.h2 fontSize="2xl" fontWeight="bold">
        {name}
      </p.h2>

      {children}
    </p.section>
  );
}

export default function PageDebug(): ReactElement {
  function Definition(): ReactElement {
    return (
      <Section bg="blue.100" name="Definition">
        <Section name="API">
          <p.div display="flex" flexDir="column" gap="10px">
            <TextInput label="Room API End Point" size="lg" />
            <TextInput label="word2vec API End Point" size="lg" />
          </p.div>
        </Section>
        <Section name="User">
          <p.div display="flex" gap="10px">
            <NumberInput label="User ID" size="lg" w="120px" />
            <TextInput label="Name" size="lg" w="100%" />
            <NumberInput label="Room ID" size="lg" w="120px" />
          </p.div>
          <p.div display="flex" gap="10px">
            <Button color="red" fullWidth size="lg" variant="light">
              Delete
            </Button>
            <Button color="grape" fullWidth size="lg" variant="light">
              Update
            </Button>
            <Button color="blue" fullWidth size="lg" variant="light">
              Create
            </Button>
          </p.div>
          <p.h2 fontSize="2xl" fontWeight="bold">
            Room
          </p.h2>

          <p.div display="flex" gap="10px">
            <NumberInput disabled label="ID" size="lg" w="50px" />
            <p.div>
              <p.p fontSize="18px">Users</p.p>
              <p.p fontSize="18px">[a, f, f, f]</p.p>
            </p.div>
          </p.div>
        </Section>
      </Section>
    );
  }

  function Status(): ReactElement {
    return (
      <Section bg="red.100" name="Status">
        <Section name="User">wa</Section>
        <Section name="Room">wa</Section>
      </Section>
    );
  }

  function Action(): ReactElement {
    return (
      <Section bg="green.100" name="Action">
        <Section name="Item">
          <p.div
            alignItems="end"
            display="grid"
            gap="10px"
            gridTemplateColumns="100px 1fr 130px"
          >
            <NumberInput label="User ID" size="lg" />
            <TextInput label="Word" size="lg" />
            <Button
              loaderProps={{
                size: "sm",
              }}
              // loading
              size="lg"
            >
              Send
            </Button>
          </p.div>
        </Section>
      </Section>
    );
  }

  return (
    <p.div h="100%" w="100%">
      <p.div p="20px">
        <p.div
          alignItems="center"
          display="flex"
          justifyContent="space-between"
        >
          <p.h1 fontSize="3xl" fontWeight="black">
            Debug Mode
          </p.h1>
          <p.p>
            {siteId} v{packageJson.version}
          </p.p>
        </p.div>
        <p.div p="5px 0" pb="20px">
          <Divider size="md" />
        </p.div>
        <p.article h="100%">
          <p.div
            display="grid"
            gap="10px"
            gridTemplateColumns="repeat(auto-fit, minmax(500px, 1fr))"
            w="100%"
          >
            <Definition />
            <p.div display="grid" gap="10px" gridTemplateRows="1fr 1fr">
              <Status />
              <Action />
            </p.div>
          </p.div>
        </p.article>
      </p.div>
    </p.div>
  );
}
