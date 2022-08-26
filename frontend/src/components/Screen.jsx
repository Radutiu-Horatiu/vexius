import { Center } from "@chakra-ui/react";
import React from "react";

const Screen = ({ children }) => {
  return (
    <Center h={"100vh"} w={"100vw"}>
      {children}
    </Center>
  );
};

export default Screen;
