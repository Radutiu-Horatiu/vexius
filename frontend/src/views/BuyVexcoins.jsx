import React, { useRef } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import SignTransaction from "../components/SignTransaction";

const BuyVexcoins = () => {
  const amountRef = useRef(null);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const buyVexcoins = async privateKey => {
    let amount = amountRef.current.value;

    if (!amount || !privateKey) return;

    // make request to blockchain to send vexcoins
    const bearerToken = await auth.currentUser.getIdToken(true);

    await axios.request({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}sendVexcoins`,
      data: {
        privateKey,
        amount,
      },
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  };

  return (
    <Box>
      <VStack w={"50vw"}>
        <Heading>Get Vexcoins</Heading>
        <Input placeholder="How many" ref={amountRef} />
        <SignTransaction
          isOpen={isOpen}
          onClose={onClose}
          callbackFunction={buyVexcoins}
        />
        <Button w="100%" onClick={onOpen}>
          Buy
        </Button>
        <Button w="100%" onClick={() => navigate("/")}>
          Back Home
        </Button>
      </VStack>
    </Box>
  );
};

export default BuyVexcoins;
