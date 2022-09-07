import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const theme = extendTheme({
  styles: {
    global: props => ({
      body: {
        bg: mode("whiteAlpha.800", "blackAlpha.900")(props),
      },
    }),
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
    cssVarPrefix: "vexius",
  },
  components: {
    Button: {
      variants: {
        solid: props => ({
          bg: props.colorMode === "dark" ? "whiteAlpha.200" : "blackAlpha.200",
          borderRadius: 25,
          h: 45,
          _hover: {
            bg:
              props.colorMode === "dark" ? "whiteAlpha.300" : "blackAlpha.300",
          },
          _active: {
            bg:
              props.colorMode === "dark" ? "whiteAlpha.300" : "blackAlpha.300",
          },
          _focus: {
            bg:
              props.colorMode === "dark" ? "whiteAlpha.300" : "blackAlpha.300",
          },
        }),
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderRadius: 25,
            h: 45,
          },
        },
      },
    },
  },
});
