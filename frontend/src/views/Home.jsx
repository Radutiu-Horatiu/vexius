import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";

import ColorModeSwitcher from "../components/ColorModeSwitcher";
import { useAuth } from "../contexts/AuthContext";
import useGetUserBalance from "../hooks/useGetUserBalance";
import useGetVexcoinData from "../hooks/useGetVexcoinData";

const Home = () => {
  const user = useSelector(state => state.user.value);
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const balance = useGetUserBalance();
  const vexcoinData = useGetVexcoinData();

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
            <Text>Balance: {balance} VX</Text>
            <Text>Vexcoins: {vexcoinData.vexcoin_amount || 0} VX</Text>
            <Text>Users: {vexcoinData.total_users || 0}</Text>
            <Button onClick={() => dispatch.user.logout()} w={"100%"}>
              Log Out
            </Button>
            <Button onClick={() => navigate("/create")} w={"100%"}>
              Create Item
            </Button>
            <Button onClick={() => navigate("/buy")} w={"100%"}>
              Buy Vexcoins
            </Button>
          </>
        )}
        <ColorModeSwitcher w={"100%"} />
      </VStack>
    </Box>
  );
};

export default Home;
