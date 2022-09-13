import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  useColorModeValue,
  useMediaQuery,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { FaArrowRight, FaCheck, FaEdit, FaTimes } from "react-icons/fa";
import { Link as ReactRouterLink } from "react-router-dom";
import { formatNumber, getItemCategoryIcon } from "../utils/helpers";
import MyAvatar from "./MyAvatar";
import { useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Item = ({ obj, editable = false }) => {
  const dateColor = useColorModeValue("blackAlpha.700", "whiteAlpha.600");
  const user = useSelector(state => state.user.value);
  const [editing, setEditing] = useState(false);
  const [minWidth1024] = useMediaQuery("(min-width: 1024px)");
  const priceRef = useRef(null);
  const toast = useToast();

  const setPrice = async () => {
    const price = priceRef.current.value;

    // some validations
    if (
      isNaN(price) ||
      isNaN(parseFloat(price)) ||
      price < 0 ||
      price > 21000000
    ) {
      toast({
        position: "bottom-right",
        title: "Error",
        description: "Not accepted. Kinda cheeky :)",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setEditing(false);
    obj.price = price;

    // item not for sale
    if (!price) {
      toast({
        position: "bottom-right",
        title: "Success",
        description: "Item set as not for sale.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // modify price in firestore
    updateDoc(doc(db, "items", obj.id), {
      modifiedAt: new Date(),
      price,
    });

    toast({
      position: "bottom-right",
      title: "Success",
      description: "Price updated successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

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
        {!editing ? (
          <VStack w={"100%"}>
            <Button
              leftIcon={<FaArrowRight />}
              as={user && ReactRouterLink}
              to={`/item/${obj.id}`}
              w={minWidth1024 ? "50%" : "100%"}
              disabled={!user}
            >
              See Item
            </Button>
            {editable && (
              <Button
                leftIcon={<FaEdit />}
                w={minWidth1024 ? "50%" : "100%"}
                onClick={() => setEditing(true)}
              >
                Set Price
              </Button>
            )}
          </VStack>
        ) : (
          <VStack w={"100%"}>
            <Input
              placeholder="Leave blank if not for sale"
              w={minWidth1024 ? "50%" : "100%"}
              ref={priceRef}
            />
            <Button
              leftIcon={<FaCheck />}
              w={minWidth1024 ? "50%" : "100%"}
              onClick={setPrice}
            >
              Done
            </Button>
            <Button
              leftIcon={<FaTimes />}
              w={minWidth1024 ? "50%" : "100%"}
              onClick={() => setEditing(false)}
            >
              Cancel
            </Button>
          </VStack>
        )}
      </VStack>
    </Box>
  );
};

export default Item;
