import { Box, Button, Grid, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactRouterLink } from "react-router-dom";

import ColorModeSwitcher from "../components/ColorModeSwitcher";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const user = useSelector(state => state.user.value);
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Heading>Vexius</Heading>

          {!isAuthenticated ? (
            <Button as={ReactRouterLink} to="/login">
              Login
            </Button>
          ) : (
            <>
              <Heading>Hello, {user.fullName}!</Heading>
              <Button onClick={() => dispatch.user.logout()}>Logout</Button>
            </>
          )}
        </VStack>
      </Grid>
    </Box>
  );
};

export default Home;
