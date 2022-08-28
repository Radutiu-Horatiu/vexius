import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";

const NavButton = ({ to, icon, text, disabled }) => {
  return (
    <Button
      as={!disabled && ReactRouterLink}
      to={to}
      w="100%"
      h={12}
      bg={"transparent"}
      disabled={disabled}
    >
      <Flex w={"100%"} align="center">
        <Text fontSize={"xl"}>{icon}</Text>
        <Text ml={5} fontSize="xl">
          {text}
        </Text>
      </Flex>
    </Button>
  );
};

export default NavButton;
