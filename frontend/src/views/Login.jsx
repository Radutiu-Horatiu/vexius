import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";

import GoogleSignIn from "../components/GoogleSignIn";

const Login = () => {
  return (
    <Flex h="100vh" w="100vw" justify="center" align="center">
      <Stack spacing={8} mx="auto" w="xl" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Sign in to your account</Heading>
        </Stack>
        <Box
          bg={useColorModeValue("gray.50", "gray.700")}
          boxShadow="lg"
          rounded="lg"
          p={5}
        >
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
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
