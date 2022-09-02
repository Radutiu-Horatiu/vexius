import {
  Button,
  Grid,
  GridItem,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import GlobalLoading from "../components/GlobalLoading";

import { auth, db } from "../firebase";

const CreateItem = () => {
  const user = useSelector(state => state.user.value);
  const nameRef = useRef("");
  const priceRef = useRef("");
  const toast = useToast();
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const createItem = async () => {
    let name = nameRef.current.value;
    let price = priceRef.current.value;

    if (!name || !price || !category || !user) return;

    setLoading(true);
    const id = uuidv4();

    const item = {
      id,
      addedAt: new Date(),
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

  if (loading) return <GlobalLoading text={"Storing item safely.."} />;

  return (
    <VStack>
      <Input placeholder="Name" ref={nameRef} />
      <Input placeholder="$" ref={priceRef} />
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
      <Button w="100%" onClick={createItem}>
        Confirm
      </Button>
    </VStack>
  );
};

export default CreateItem;
