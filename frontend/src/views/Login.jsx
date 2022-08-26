import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";

import GoogleSignIn from "../components/GoogleSignIn";
import { useAuth } from "../contexts/AuthContext";
import GlobalLoading from "../components/GlobalLoading";

const Login = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <GlobalLoading />;

  return (
    <Box>
      <VStack w={"50vw"}>
        <Heading fontSize="4xl">Sign In To Vexius</Heading>
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
  );
};

export default Login;
