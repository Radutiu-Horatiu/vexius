import React from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
  useMediaQuery,
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
  const [minWidth1024] = useMediaQuery("(min-width: 1024px)");

  return (
    <Box w={"100%"} borderTopWidth={1} p={minWidth1024 ? 5 : 2}>
      <Flex>
        <MyAvatar name={obj.ownerName} />
        <Box ml={2}>
          <Flex align={"center"}>
            <Text>{obj.ownerName}</Text>
            <Text fontWeight={"light"} fontSize={"xs"} color={dateColor} ml={1}>
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
      </Flex>

      <VStack p={10} borderRadius={25}>
        <VStack>
          <Text fontSize={"4xl"}>{getItemCategoryIcon(obj.category)}</Text>
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
          w={minWidth1024 ? "50%" : "100%"}
          disabled={!user}
        >
          See Item
        </Button>
      </VStack>
    </Box>
  );
};

export default Item;
