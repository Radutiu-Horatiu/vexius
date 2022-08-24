import React from "react";
import { Center, VStack, Heading } from "@chakra-ui/layout";
import { Spinner, useColorModeValue } from "@chakra-ui/react";

const GlobalLoading = ({ text }) => {
  return (
    <Center
      h="100vh"
      w="100vw"
      pos={"fixed"}
      top="0"
      left="0"
      bg={useColorModeValue("whiteAlpha.900", "blackAlpha.900")}
      zIndex={1}
    >
      <VStack spacing={5}>
        {text && <Heading textTransform={"capitalize"}>{text}</Heading>}
        <Spinner size={"lg"} thickness={3} />
      </VStack>
    </Center>
  );
};

export default GlobalLoading;
