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
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { EMAIL_REGEX } from "../utils/constants";

const Register = ({ registerWithEmailAndPassword, rematchLoading }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast();

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

  const { field: fieldName } = useController({
    control: control,
    defaultValue: "",
    name: "name",
    rules: {
      required: { value: true, message: "Valid name is required" },
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

  const { field: fieldPasswordConfirm } = useController({
    control: control,
    defaultValue: "",
    name: "passwordConfirm",
    rules: {
      required: { value: true, message: "Password Confirmation is required" },
      validate: value => value === fieldPassword.value,
    },
  });

  const signUp = React.useCallback(
    async ({ email, name, password }) => {
      try {
        await registerWithEmailAndPassword({
          email,
          name,
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
    [registerWithEmailAndPassword, toast]
  );

  const handleEnterKeyPressDown = React.useCallback(
    e => {
      if ((e.code === "Enter" || e.key === "Enter") && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(signUp)();
      }
    },
    [handleSubmit, signUp]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", handleEnterKeyPressDown);
    return () => window.removeEventListener("keydown", handleEnterKeyPressDown);
  }, [handleEnterKeyPressDown]);

  return (
    <Flex h="100vh" w="100vw" justify="center" align="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Create your new account</Heading>
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
            <FormControl id="name" isRequired isInvalid={errors?.name}>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                onChange={fieldName.onChange}
                value={fieldName.value}
                name={fieldName.name}
                placeholder="John Doe"
              />
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
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
            <FormControl
              id="passwordConfirm"
              isRequired
              isInvalid={errors?.passwordConfirm}
            >
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                onChange={fieldPasswordConfirm.onChange}
                value={fieldPasswordConfirm.value}
                name={fieldPasswordConfirm.name}
                placeholder="*******"
              />
              <FormErrorMessage>
                {errors?.passwordConfirm?.message ||
                  (errors?.passwordConfirm?.type === "validate" &&
                    "Passwords must match")}
              </FormErrorMessage>
            </FormControl>
            <Stack spacing={4} pt={10}>
              <Button
                onClick={handleSubmit(signUp)}
                isLoading={
                  isSubmitting ||
                  rematchLoading.effects.user.registerWithEmailAndPassword
                    .loading
                }
              >
                Create account
              </Button>
              <Button as={ReactRouterLink} to="/" variant="outline">
                Go Home
              </Button>
              <Link as={ReactRouterLink} to="/login">
                Already have an account?
              </Link>
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
  registerWithEmailAndPassword: dispatch.user.registerWithEmailAndPassword,
});

export default connect(mapState, mapDispatch)(Register);
