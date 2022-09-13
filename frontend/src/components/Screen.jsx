import { Box, Heading, useColorMode } from "@chakra-ui/react";
import React from "react";

const Screen = ({ children, name, padding = "1vh" }) => {
  const theme = useColorMode();

  return (
    <Box
      borderWidth={1}
      borderTop={"none"}
      borderBottom={"none"}
      w={["100%", "100%", "30vw"]}
    >
      <Heading fontSize={"2xl"} fontWeight="thin" h="5vh" p={"1vh"}>
        {name}
      </Heading>
      <Box
        h="93vh"
        overflowY={"auto"}
        p={padding}
        py="1vh"
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
