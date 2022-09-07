import { Avatar, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const MyAvatar = props => {
  const color = useColorModeValue("blackAlpha.900", "whiteAlpha.900");

  return (
    <Avatar
      bgColor="transparent"
      borderWidth={2}
      borderColor={color}
      color={color}
      {...props}
    />
  );
};

export default MyAvatar;
