import React from "react";
import {
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
import MyAvatar from "./MyAvatar";
import { useSelector } from "react-redux";

const Item = ({ obj }) => {
  const dateColor = useColorModeValue("blackAlpha.700", "whiteAlpha.600");
  const user = useSelector(state => state.user.value);

  return (
    <Box w={"100%"} borderTopWidth={1} p={5}>
      <Flex>
        <MyAvatar name={obj.ownerName} />
        <Box ml={2} w={"100%"}>
          <Stack>
            <Box>
              <Flex align={"center"}>
                <Text>{obj.ownerName}</Text>
                <Text
                  fontWeight={"light"}
                  fontSize={"xs"}
                  color={dateColor}
                  ml={1}
                >
                  {formatDistance(
                    obj.modifiedAt.seconds
                      ? new Date(obj.modifiedAt.seconds * 1000)
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
                  {obj.addedAt.seconds
                    ? new Date(obj.addedAt.seconds * 1000).toLocaleDateString()
                    : new Date().toLocaleDateString()}
                </Text>
                {obj.price && (
                  <Text fontWeight={"bold"}>{formatNumber(obj.price)} VX</Text>
                )}
              </VStack>
              <Button
                leftIcon={<FaArrowRight />}
                as={user && ReactRouterLink}
                to={`/item/${obj.id}`}
                w="50%"
                disabled={!user}
              >
                See Item
              </Button>
            </VStack>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Item;
