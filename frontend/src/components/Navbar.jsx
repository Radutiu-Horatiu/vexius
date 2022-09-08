import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaArrowCircleRight,
  FaEllipsisV,
  FaExchangeAlt,
  FaHome,
  FaMoon,
  FaPlus,
  FaSignOutAlt,
  FaSun,
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
  const requests = useSelector(state => state.requests.data);
  const balance = useSelector(state => state.user.balance);
  const bgColor = useColorModeValue("white", "black");
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("Dark", "Light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

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
          number={requests.length}
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
                  <Text fontSize="lg" letterSpacing={"wider"}>
                    {formatNumber(balance)} VX
                  </Text>
                </Box>
              </Flex>

              {/* More button */}
              <Menu>
                <MenuButton as={Button} bg="transparent">
                  <FaEllipsisV />
                </MenuButton>
                <MenuList bg={bgColor}>
                  <MenuItem
                    icon={<FaSignOutAlt />}
                    onClick={() => dispatch.user.logout()}
                  >
                    Log Out
                  </MenuItem>
                  <MenuItem onClick={toggleColorMode} icon={<SwitchIcon />}>
                    {text}
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </VStack>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
