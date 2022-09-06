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
import { useSelector } from "react-redux";

const Item = ({ obj }) => {
  const dateColor = useColorModeValue("blackAlpha.600", "whiteAlpha.600");
  const user = useSelector(state => state.user.value);

  return (
    <Box w={"100%"} borderTopWidth={1} p={"1vh"}>
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
                    obj.addedAt.seconds
                      ? new Date(obj.addedAt.seconds * 1000)
                      : new Date(),
                    new Date(),
                    { addSuffix: true }
                  )}
                </Text>
              </Flex>
              <Text>{obj.category}</Text>
            </Box>

            <VStack p={10} borderRadius={25}>
              <VStack>
                <Text fontSize={"4xl"}>
                  {getItemCategoryIcon(obj.category)}
                </Text>
                <Text fontWeight={"bold"}>{obj.name}</Text>
                <Text fontSize={"sm"} color={dateColor} fontWeight="light">
                  Registered on{" "}
                  {new Date(obj.addedAt.seconds * 1000).toLocaleDateString()}
                </Text>
              </VStack>
              {user && user.publicKey !== obj.currentOwner && (
                <Button
                  leftIcon={<FaArrowRight />}
                  as={ReactRouterLink}
                  to={`/item/${obj.id}`}
                  w="50%"
                >
                  Get Item For {formatNumber(obj.price)} VX
                </Button>
              )}
            </VStack>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Item;
