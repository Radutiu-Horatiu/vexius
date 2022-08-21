import {
  Button,
  Center,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link as ReactRouterLink } from "react-router-dom";

const Protected = () => {
  const dispatch = useDispatch();

  return (
    <Center h="100vh" w="100vw">
      <VStack spacing={4}>
        <Heading>PROTECTED 🔒</Heading>
        <Text align="center">
          This route is protected by the <em>RequireAuth</em> routing
          middleware.
        </Text>
        <HStack>
          <Button as={ReactRouterLink} to="/">
            Go Home
          </Button>
          <Button onClick={() => dispatch.user.logout()}>Logout</Button>
        </HStack>
      </VStack>
    </Center>
  );
};

export default Protected;
