import {
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useColorModeValue,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaEllipsisH, FaSearch } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { getItemCategoryIcon } from "../utils/helpers";

const RightSideContent = () => {
  const [minWidth1024] = useMediaQuery("(min-width: 1024px)");
  const secondaryColor = useColorModeValue("blackAlpha.700", "whiteAlpha.600");
  const bgColor = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const { isAuthenticated } = useAuth();

  const categories = [
    { category: "Automobiles", number: "1,2K" },
    { category: "Clothing", number: "14,3K" },
    { category: "Shoes", number: "7,5K" },
    { category: "Accessories", number: "17,8K" },
  ];

  if (!minWidth1024) return;

  return (
    <Flex
      h="100%"
      justifyContent="space-between"
      flexDir={"column"}
      p={2}
      w={"15vw"}
    >
      <VStack>
        {/* Search */}
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<FaSearch />} />
          <Input placeholder="Search Vexius" />
        </InputGroup>

        {/* Trends */}
        <Stack p={4} borderRadius={25} bg={bgColor} w={"100%"} spacing={6}>
          <Text fontSize={"xl"}>Trends for you</Text>

          {categories.map(obj => (
            <Flex justify={"space-between"} align="center" key={obj.category}>
              {/* Left side */}
              <Stack>
                <HStack>
                  <Text fontSize={"lg"}>
                    {getItemCategoryIcon(obj.category)}
                  </Text>
                  <Text fontSize={"md"}>{obj.category}</Text>
                </HStack>
                <Text fontSize={"xs"} color={secondaryColor}>
                  {obj.number} items
                </Text>
              </Stack>

              {/* Right side */}
              <IconButton
                icon={<FaEllipsisH />}
                bg="transparent"
                disabled={!isAuthenticated}
              />
            </Flex>
          ))}
        </Stack>
      </VStack>
    </Flex>
  );
};

export default RightSideContent;
