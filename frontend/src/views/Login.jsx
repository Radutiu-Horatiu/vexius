import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Button, Flex, Heading, Stack, VStack } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";

import GoogleSignIn from "../components/GoogleSignIn";

const Login = () => {
  return (
    <Flex h="100vh" w="100vw" justify="center" align="center">
      <Stack spacing={8} mx="auto" w="xl">
        <Stack align="center">
          <Heading fontSize="4xl">Sign In To Vexius</Heading>
        </Stack>
        <VStack>
          <GoogleSignIn />
          <Button
            as={ReactRouterLink}
            to="/"
            w={"100%"}
            leftIcon={<FaArrowLeft />}
          >
            Go Back
          </Button>
        </VStack>
      </Stack>
    </Flex>
  );
};

export default Login;
