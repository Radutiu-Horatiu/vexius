import { Box, Heading, useColorMode } from "@chakra-ui/react";
import React from "react";

const Screen = ({ children, name }) => {
  const theme = useColorMode();

  return (
    <Box p={"1vh"} borderWidth={1} borderTop={"none"} borderBottom={"none"}>
      <Heading fontSize={"2xl"} fontWeight="thin" h="4vh">
        {name}
      </Heading>
      <Box
        h="94vh"
        w={"50vw"}
        overflowY={"scroll"}
        pr="1vh"
        className={
          theme.colorMode === "dark"
            ? "darkModeScrollbar"
            : "lightModeScrollbar"
        }
      >
        {children}
      </Box>
    </Box>
  );
};

export default Screen;
