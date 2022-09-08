import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";

const NavButton = ({ to, icon, text, disabled, number = null }) => {
  return (
    <Button
      as={!disabled && ReactRouterLink}
      to={to}
      w="100%"
      bg={"transparent"}
      disabled={disabled}
    >
      <Flex w={"100%"} align="center">
        <Text fontSize={"xl"}>{icon}</Text>
        <Text ml={5} fontSize="xl">
          {text}
        </Text>
        {number !== null && (
          <Flex
            w={5}
            h={5}
            borderWidth={1}
            borderc
            ml={2}
            justify="center"
            align={"center"}
            p={3}
            borderRadius={"50%"}
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
