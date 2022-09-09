import {
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";

const NavButton = ({ to, icon, text, disabled, number = null }) => {
  const [minWidth1024] = useMediaQuery("(min-width: 1024px)");
  const bgColor = useColorModeValue("white", "black");

  return (
    <Button
      as={!disabled && ReactRouterLink}
      to={to}
      bg={"transparent"}
      disabled={disabled}
    >
      <Flex mr={"auto"} align="center" pos={"relative"}>
        <Icon as={icon} fontSize={"xl"} />
        {minWidth1024 && (
          <Text ml={2} fontSize="xl">
            {text}
          </Text>
        )}
        {number !== null && (
          <Flex
            w={5}
            h={5}
            borderWidth={1}
            ml={2}
            justify="center"
            align={"center"}
            p={minWidth1024 ? 3 : 2}
            borderRadius={"50%"}
            pos={!minWidth1024 && "absolute"}
            zIndex={1}
            bgColor={bgColor}
            bottom={-3}
            right={-3}
          >
            <Text fontSize="xs" textAlign={"Flex"}>
              {number}
            </Text>
          </Flex>
        )}
      </Flex>
    </Button>
  );
};

export default NavButton;
