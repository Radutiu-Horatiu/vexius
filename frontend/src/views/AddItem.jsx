import {
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { useState, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import GlobalLoading from "../components/GlobalLoading";

import { auth, db } from "../firebase";

const AddItem = () => {
  const user = useSelector(state => state.user.value);
  const secondaryColor = useColorModeValue("blackAlpha.700", "whiteAlpha.600");
  const blackBg = useColorModeValue("white", "black");
  const nameRef = useRef("");
  const priceRef = useRef(0);
  const toast = useToast();
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const categories = [
    "Watches",
    "Jewelry",
    "Clothing",
    "Shoes",
    "Handbags",
    "Accessories",
    "Beauty",
    "Automobiles",
    "Fine Wines",
  ];

  const addItem = async () => {
    let name = nameRef.current.value;
    let price = priceRef.current.value;

    if (!name || !category || !user) {
      toast({
        position: "bottom-right",
        title: "Error.",
        description: "Name and category are mandatory fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    const id = uuidv4();

    const item = {
      id,
      addedAt: new Date(),
      modifiedAt: new Date(),
      currentOwner: user.publicKey,
      ownerName: user.fullName,
      name,
      price,
      category,
    };

    // dispatch
    dispatch.items.addItem(item);

    // save item to firestore
    setDoc(doc(db, "items", id), item);

    // send item to blockchain
    const bearerToken = await auth.currentUser.getIdToken(true);

    await axios.request({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}addNewItem`,
      data: {
        itemId: id,
        ownerPublicKey: user.publicKey,
      },
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    setLoading(false);

    toast({
      position: "bottom-right",
      title: "Success",
      description: "Item stored on the blockchain for a very long time.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  if (loading) return <GlobalLoading text={"Storing safely.."} />;

  return (
    <Flex h={"100%"} flexDir="column" justify="center">
      <VStack spacing={8}>
        <Heading>Your New Item</Heading>
        <VStack w={"75%"}>
          <Input placeholder="Name" ref={nameRef} />
          <Input placeholder="Price" ref={priceRef} />
          <Select onChange={e => setCategory(e.currentTarget.value)}>
            <option hidden>Select category</option>
            {categories.map(obj => (
              <option
                key={obj}
                value={obj}
                style={{ backgroundColor: blackBg }}
              >
                {obj}
              </option>
            ))}
          </Select>
        </VStack>

        <VStack w={"75%"}>
          <Button w="100%" onClick={addItem} leftIcon={<FaCheckCircle />}>
            Confirm
          </Button>
          <Text fontSize={"xs"} color={secondaryColor}>
            *Leave price empty if not for sale.
          </Text>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default AddItem;
