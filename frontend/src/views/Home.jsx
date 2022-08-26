import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";

import ColorModeSwitcher from "../components/ColorModeSwitcher";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const user = useSelector(state => state.user.value);
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <Box>
      <VStack w={"50vw"}>
        <Heading>Vexius</Heading>

        {!isAuthenticated ? (
          <Button as={ReactRouterLink} to="/login" w={"100%"}>
            Login
          </Button>
        ) : (
          <>
            <Heading>Hello, {user.fullName}!</Heading>
            <Button onClick={() => dispatch.user.logout()} w={"100%"}>
              Log Out
            </Button>
            <Button onClick={() => navigate("/create")} w={"100%"}>
              Create Item
            </Button>
          </>
        )}
        <ColorModeSwitcher w={"100%"} />
      </VStack>
    </Box>
  );
};

export default Home;
