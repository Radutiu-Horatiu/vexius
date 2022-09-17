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
    <Box>
      {/* Navbar */}
      <Flex
        pos={"fixed"}
        top={0}
        left={0}
        p={5}
        px={[3, 3, "20vw"]}
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
        <HStack spacing={[2, 2, 6]}>
          <a
            href="https://github.com/Radutiu-Horatiu/vexius"
            target="_blank"
            rel="noreferrer"
          >
            <Text fontSize={["md", "md", "lg"]}>Github</Text>
          </a>
          <a
            href="https://firebasestorage.googleapis.com/v0/b/vexius-56e53.appspot.com/o/Vexius_Lightpaper.pdf?alt=media"
            target="_blank"
            rel="noreferrer"
          >
            <Text fontSize={["md", "md", "lg"]}>Lightpaper</Text>
          </a>
          <ColorModeSwitcher noText={true} />
        </HStack>
      </Flex>

      {/* Main Screen */}
      <Center h={"100vh"} w={["100vw", "100vw", "60vw"]}>
        <Flex
          flexDir={["column", "column", "row"]}
          p={5}
          justify="center"
          align={"center"}
        >
          <VStack spacing={[4, 4, 8]}>
            <Image src={logo} w={["15vh", "15vh", "20vh"]} />
            <VStack spacing={0}>
              <Heading fontWeight={"light"} fontSize={["md", "md", "xl"]}>
                Your Marketplace.
              </Heading>
              <Heading fontWeight={"light"} fontSize={["md", "md", "xl"]}>
                From The Metaverse.
              </Heading>
            </VStack>

            <Divider />

            <VStack spacing={4}>
              <Text
                textAlign="center"
                textTransform={"capitalize"}
                fontSize={["md", "md", "3xl"]}
              >
                Decentralized Store for luxury goods
              </Text>

              <Button
                as={ReactRouterLink}
                // to="/home?tutorial=true"
                to="/home"
                leftIcon={<FaArrowRight />}
                w="100%"
                variant={"outline"}
                borderRadius={25}
                h="5vh"
              >
                Check Out
              </Button>
            </VStack>
          </VStack>

          <Image
            src={APP_IMAGE}
            h={["35vh", "35vh", "70vh"]}
            w="100%"
            mt={[5, 5, 0]}
          />
        </Flex>
      </Center>
    </Box>
  );
};

export default LandingPage;
