import React from "react";
import { useColorMode, useColorModeValue, Button } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("Dark", "Light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Button onClick={toggleColorMode} leftIcon={<SwitchIcon />} {...props}>
      {text}
    </Button>
  );
};

export default ColorModeSwitcher;
