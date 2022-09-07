import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaArrowCircleRight,
  FaExchangeAlt,
  FaHome,
  FaPlus,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

import { useAuth } from "../contexts/AuthContext";
import ColorModeSwitcher from "../components/ColorModeSwitcher";
import NavButton from "./NavButton";
import GoogleSignIn from "./GoogleSignIn";
import { formatNumber } from "../utils/helpers";
import MyAvatar from "./MyAvatar";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.value);
  const balance = useSelector(state => state.user.balance);
  const emailColor = useColorModeValue("blackAlpha.700", "whiteAlpha.600");

  return (
    <Flex
      w={"15vw"}
      h="100%"
      justifyContent="space-between"
      flexDir={"column"}
      p={"1vh"}
    >
      {/* Top */}
      <Stack>
        <Heading
          textTransform={"uppercase"}
          fontWeight="light"
          letterSpacing={"wider"}
          fontSize="4xl"
          mb={5}
        >
          Vexius
        </Heading>
        <NavButton to={"/"} icon={<FaHome />} text="Home" />
        <NavButton
          to={"/profile"}
          icon={<FaUser />}
          text="Profile"
          disabled={!isAuthenticated}
        />
        <NavButton
          to={"/requests"}
          icon={<FaExchangeAlt />}
          text="Requests"
          disabled={!isAuthenticated}
        />
        <NavButton
          to={"/add"}
          icon={<FaPlus />}
          text="Add Item"
          disabled={!isAuthenticated}
        />
        <NavButton
          to={"/buy"}
          icon={<FaArrowCircleRight />}
          text="Get Vexcoins"
          disabled={!isAuthenticated}
        />
      </Stack>

      {/* Bottom */}
      <Box>
        {!isAuthenticated ? (
          <HStack w={"100%"}>
            <GoogleSignIn />
            <ColorModeSwitcher w="100%" />
          </HStack>
        ) : (
          <VStack spacing={4}>
            <Flex w="100%" align="center" justify={"space-between"}>
              <Flex align="center">
                <MyAvatar name={user.fullName} />
                <Box ml={2}>
                  <Text fontSize="md">{user.fullName}</Text>
                  <Text fontSize={"xs"} color={emailColor}>
                    {user.email}
                  </Text>
                  <Text fontSize="lg" letterSpacing={"wider"}>
                    {formatNumber(balance)} VX
                  </Text>
                </Box>
              </Flex>
            </Flex>

            <HStack w={"100%"}>
              <Button
                onClick={() => dispatch.user.logout()}
                w={"100%"}
                leftIcon={<FaSignOutAlt />}
              >
                Log Out
              </Button>
              <ColorModeSwitcher w="100%" />
            </HStack>
          </VStack>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
