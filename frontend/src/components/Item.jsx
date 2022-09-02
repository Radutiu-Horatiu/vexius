import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { FaArrowRight } from "react-icons/fa";
import { Link as ReactRouterLink } from "react-router-dom";
import { formatNumber, getItemCategoryIcon } from "../utils/helpers";

const Item = ({ obj }) => {
  const dateColor = useColorModeValue("blackAlpha.600", "whiteAlpha.600");

  return (
    <Box w={"100%"} borderTopWidth={1} p={"3vh"}>
      <Flex>
        <Avatar name={obj.ownerName} />
        <Box ml={2} w={"100%"}>
          <Stack>
            <Box>
              <Flex align={"center"}>
                <Text fontWeight={"light"}>{obj.ownerName}</Text>
                <Text
                  fontWeight={"light"}
                  fontSize={"xs"}
                  color={dateColor}
                  ml={1}
                >
                  {formatDistance(
                    new Date(obj.addedAt.seconds * 1000),
                    new Date(),
                    { addSuffix: true }
                  )}
                </Text>
              </Flex>
              <Text fontWeight={"bold"}>{obj.name}</Text>
            </Box>

            <Stack p={10} borderWidth={1} borderRadius={25}>
              <VStack>
                <Text fontSize={"2xl"}>
                  {getItemCategoryIcon(obj.category)}
                </Text>
                <Text>{obj.category}</Text>
              </VStack>
              <Button
                leftIcon={<FaArrowRight />}
                as={ReactRouterLink}
                to={`/item/${obj.id}`}
              >
                Get Item For {formatNumber(obj.price)} VX
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Item;
