import React from "react";
import {
  useColorMode,
  useColorModeValue,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorModeSwitcher = ({ noText = false }) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("Dark", "Light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Button
      onClick={toggleColorMode}
      leftIcon={!noText && <SwitchIcon />}
      w="100%"
    >
      {noText && <Icon as={SwitchIcon} fontSize={"md"} />}
      {!noText && text}
    </Button>
  );
};

export default ColorModeSwitcher;
