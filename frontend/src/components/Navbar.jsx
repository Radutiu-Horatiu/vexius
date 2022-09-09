import React from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaArrowCircleRight,
  FaEllipsisH,
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
import WHITE_LOGO from "../assets/images/VX_white.png";
import DARK_LOGO from "../assets/images/VX_black.png";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.value);
  const requests = useSelector(state => state.requests.data);
  const balance = useSelector(state => state.user.balance);
  const bgColor = useColorModeValue("white", "black");
  const logo = useColorModeValue(DARK_LOGO, WHITE_LOGO);
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("Dark", "Light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const [minWidth1024] = useMediaQuery("(min-width: 1024px)");

  return (
    <Flex
      h="100%"
      justifyContent="space-between"
      flexDir={"column"}
      p={2}
      w={"15vw"}
      pos={!minWidth1024 && "fixed"}
      top={0}
      left={0}
      zIndex={1}
    >
      {/* Top */}
      <Stack spacing={3}>
        <Flex justify={["center", "center", "flex-start"]} mb={5}>
          {minWidth1024 ? (
            <Heading
              textTransform={"uppercase"}
              fontWeight="light"
              letterSpacing={"wider"}
              fontSize="4xl"
            >
              Vexius
            </Heading>
          ) : (
            <Image src={logo} w={10} mt={"1vh"} />
          )}
        </Flex>

        <NavButton to={"/"} icon={FaHome} text="Home" />
        <NavButton
          to={"/profile"}
          icon={FaUser}
          text="Profile"
          disabled={!isAuthenticated}
        />
        <NavButton
          to={"/requests"}
          icon={FaExchangeAlt}
          text="Requests"
          disabled={!isAuthenticated}
          number={requests.length}
        />
        <NavButton
          to={"/add"}
          icon={FaPlus}
          text="Add Item"
          disabled={!isAuthenticated}
        />
        <NavButton
          to={"/buy"}
          icon={FaArrowCircleRight}
          text="Get Vexcoins"
          disabled={!isAuthenticated}
        />
      </Stack>

      {/* Bottom */}
      <Box>
        {!isAuthenticated ? (
          minWidth1024 ? (
            <HStack w={"100%"}>
              <GoogleSignIn />
              <ColorModeSwitcher w="100%" />
            </HStack>
          ) : (
            <Menu>
              <MenuButton
                as={IconButton}
                bg="transparent"
                icon={<FaEllipsisH />}
              ></MenuButton>
              <MenuList bg={bgColor}>
                <GoogleSignIn bg="transparent" />
                <ColorModeSwitcher w="100%" bg="transparent" mt={2} />
              </MenuList>
            </Menu>
          )
        ) : (
          <VStack spacing={4}>
            <Flex w="100%" align="center" justify={"space-between"}>
              {minWidth1024 && (
                <Flex align="center">
                  <MyAvatar name={user.fullName} />

                  <Box ml={2}>
                    <Text fontSize="md">{user.fullName}</Text>
                    <Text fontSize="lg" letterSpacing={"wider"}>
                      {formatNumber(balance)} VX
                    </Text>
                  </Box>
                </Flex>
              )}

              {/* More button */}
              <Menu>
                <MenuButton
                  as={IconButton}
                  bg="transparent"
                  icon={<FaEllipsisH />}
                ></MenuButton>
                <MenuList bg={bgColor}>
                  {!minWidth1024 && (
                    <>
                      <Flex align="center" m={2}>
                        <MyAvatar name={user.fullName} />

                        <Box ml={2}>
                          <Text fontSize="md">{user.fullName}</Text>
                          <Text fontSize="lg" letterSpacing={"wider"}>
                            {formatNumber(balance)} VX
                          </Text>
                        </Box>
                      </Flex>
                      <MenuDivider />
                    </>
                  )}

                  <MenuItem
                    icon={<FaSignOutAlt />}
                    onClick={() => dispatch.user.logout()}
                    bg="red"
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
