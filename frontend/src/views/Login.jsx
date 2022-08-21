import React from "react";
import { useController, useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { EMAIL_REGEX } from "../utils/constants";

const Login = ({ loginWithEmailAndPassword, rematchLoading }) => {
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { field: fieldEmail } = useController({
    control: control,
    defaultValue: "",
    name: "email",
    rules: {
      pattern: {
        value: EMAIL_REGEX,
        message: "Valid email is required",
      },
      required: { value: true, message: "Valid email is required" },
    },
  });

  const { field: fieldPassword } = useController({
    control: control,
    defaultValue: "",
    name: "password",
    rules: {
      required: { value: true, message: "Password is required" },
    },
  });

  const signIn = React.useCallback(
    async ({ email, password }) => {
      try {
        await loginWithEmailAndPassword({
          email,
          password,
        });
      } catch (error) {
        console.error(error);
        const errorMessage = error?.code?.split("/")?.[1]?.replaceAll("-", " ");

        toast({
          position: "bottom-right",
          title: errorMessage
            ? errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
            : "Something went wrong... 😕",
          description: "Please try again",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    },
    [loginWithEmailAndPassword, toast]
  );

  const handleEnterKeyPressDown = React.useCallback(
    e => {
      if ((e.code === "Enter" || e.key === "Enter") && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(signIn)();
      }
    },
    [handleSubmit, signIn]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", handleEnterKeyPressDown);
    return () => window.removeEventListener("keydown", handleEnterKeyPressDown);
  }, [handleEnterKeyPressDown]);

  return (
    <Flex h="100vh" w="100vw" justify="center" align="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Sign in to your account</Heading>
        </Stack>
        <Box
          bg={useColorModeValue("gray.50", "gray.700")}
          boxShadow="lg"
          rounded="lg"
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired isInvalid={errors?.email}>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                onChange={fieldEmail.onChange}
                value={fieldEmail.value}
                name={fieldEmail.name}
                placeholder="your-email@example.com"
              />
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="password" isRequired isInvalid={errors?.password}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={fieldPassword.onChange}
                value={fieldPassword.value}
                name={fieldPassword.name}
                placeholder="*******"
              />
              <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
            </FormControl>
            <Stack spacing={10}>
              <Link as={ReactRouterLink} to="/reset-password">
                Reset password?
              </Link>
              <Stack spacing={4}>
                <Button
                  onClick={handleSubmit(signIn)}
                  isLoading={
                    isSubmitting ||
                    rematchLoading.effects.user.loginWithEmailAndPassword
                      .loading
                  }
                >
                  Sign in
                </Button>
                <Button as={ReactRouterLink} to="/register" variant="outline">
                  Create new account
                </Button>
                <Button as={ReactRouterLink} to="/" variant="outline">
                  Go Home
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

const mapState = state => ({
  rematchLoading: state.loading,
});

const mapDispatch = dispatch => ({
  loginWithEmailAndPassword: dispatch.user.loginWithEmailAndPassword,
});

export default connect(mapState, mapDispatch)(Login);
