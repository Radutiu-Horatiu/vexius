import React from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  useColorModeValue,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

import WHITE_LOGO from "../assets/images/VX_white.png";
import DARK_LOGO from "../assets/images/VX_black.png";
import APP_IMAGE from "../assets/images/app_image.png";
import { FaArrowRight } from "react-icons/fa";
import ColorModeSwitcher from "../components/ColorModeSwitcher";

const LandingPage = () => {
  const [minWidth1024] = useMediaQuery("(min-width: 1024px)");
  const logo = useColorModeValue(DARK_LOGO, WHITE_LOGO);
  const bgColor = useColorModeValue("white", "black");

  return (
    <Box p={5}>
      {/* Navbar */}
      <Flex
        pos={"fixed"}
        top={0}
        left={0}
        p={5}
        px="20vw"
        justify={"space-between"}
        w="100%"
        bg={bgColor}
      >
        {/* Logo */}
        <Box>
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
        </Box>

        {/* Nav items */}
        <HStack spacing={6}>
          <a href="https://github.com/Radutiu-Horatiu/vexius" target="_blank">
            <Text fontWeight={"bold"} fontSize="lg">
              Github
            </Text>
          </a>
          <a href="https://github.com/Radutiu-Horatiu/vexius" target="_blank">
            <Text fontWeight={"bold"} fontSize="lg">
              Lightpaper
            </Text>
          </a>
          <ColorModeSwitcher noText={true} />
        </HStack>
      </Flex>

      {/* Main Screen */}
      <Center h={"100vh"} w={["100vw", "100vw", "60vw"]}>
        <HStack spacing={8}>
          <VStack spacing={8}>
            <Image src={logo} w={"20vh"} />
            <VStack spacing={0}>
              <Heading fontWeight={"light"} fontSize="xl">
                Your Marketplace.
              </Heading>
              <Heading fontWeight={"light"} fontSize="xl">
                From The Metaverse.
              </Heading>
            </VStack>

            <Divider />

            <VStack spacing={4}>
              <Text
                textAlign="center"
                textTransform={"capitalize"}
                fontSize="3xl"
              >
                Vexius is a decentralized marketplace for luxury items.
              </Text>

              <Button
                as={ReactRouterLink}
                to="/home"
                leftIcon={<FaArrowRight />}
                w="100%"
                variant={"outline"}
                borderRadius={25}
                h='5vh'
              >
                Check Out
              </Button>
            </VStack>
          </VStack>

          <Image src={APP_IMAGE} h={"70vh"} />
        </HStack>
      </Center>
    </Box>
  );
};

export default LandingPage;
