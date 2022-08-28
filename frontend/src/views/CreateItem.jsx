import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import SignTransaction from "../components/SignTransaction";

import { auth, db } from "../firebase";

const CreateItem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const nameRef = useRef("");
  const priceRef = useRef("");
  const [category, setCategory] = useState(null);

  const createItem = async privateKey => {
    let name = nameRef.current.value;
    let price = priceRef.current.value;

    if (!name || !price || !category || !privateKey) return;

    const id = uuidv4();

    // save item to firestore
    setDoc(doc(db, "items", id), {
      name,
      price,
      category,
      id,
    });

    // send item to blockchain
    const bearerToken = await auth.currentUser.getIdToken(true);

    await axios.request({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}addNewItem`,
      data: {
        itemId: id,
        ownerId: privateKey,
      },
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  };

  return (
    <>
      <Box bgColor={"rebeccapurple"} h="550vh"></Box>
      <VStack w={"50vw"}>
        <Input placeholder="Name" ref={nameRef} />
        <Input placeholder="$" ref={priceRef} />
        <SignTransaction
          isOpen={isOpen}
          onClose={onClose}
          callbackFunction={createItem}
        />
        <Grid templateColumns="repeat(3, 1fr)" w={"100%"} gap={3}>
          <GridItem w="100%">
            <Button w={"100%"} onClick={() => setCategory("Watches")}>
              <Text>Watches</Text>
            </Button>
          </GridItem>
          <GridItem w="100%">
            <Button w={"100%"} onClick={() => setCategory("Jewelry")}>
              <Text>Jewelry</Text>
            </Button>
          </GridItem>
          <GridItem w="100%">
            <Button w={"100%"} onClick={() => setCategory("Clothing")}>
              <Text>Clothing</Text>
            </Button>
          </GridItem>
          <GridItem w="100%">
            <Button w={"100%"} onClick={() => setCategory("Shoes")}>
              <Text>Shoes</Text>
            </Button>
          </GridItem>
          <GridItem w="100%">
            <Button w={"100%"} onClick={() => setCategory("Handbags")}>
              <Text>Handbags</Text>
            </Button>
          </GridItem>
          <GridItem w="100%">
            <Button w={"100%"} onClick={() => setCategory("Accessories")}>
              <Text>Accessories</Text>
            </Button>
          </GridItem>
          <GridItem w="100%">
            <Button w={"100%"} onClick={() => setCategory("Beauty")}>
              <Text>Beauty</Text>
            </Button>
          </GridItem>
          <GridItem w="100%">
            <Button w={"100%"} onClick={() => setCategory("Automobiles")}>
              <Text>Automobiles</Text>
            </Button>
          </GridItem>
          <GridItem w="100%">
            <Button w={"100%"} onClick={() => setCategory("Fine Wines")}>
              <Text>Fine Wines</Text>
            </Button>
          </GridItem>
        </Grid>
        <Button w="100%" onClick={onOpen}>
          Confirm
        </Button>
      </VStack>
    </>
  );
};

export default CreateItem;
