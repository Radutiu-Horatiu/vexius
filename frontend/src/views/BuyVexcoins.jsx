import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { FaArrowCircleRight } from "react-icons/fa";

import { auth } from "../firebase";
import SignTransaction from "../components/SignTransaction";
import GlobalLoading from "../components/GlobalLoading";
import useGetVexcoinData from "../hooks/useGetVexcoinData";

const BuyVexcoins = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const amountRef = useRef(null);
  const toast = useToast();
  const dispatch = useDispatch();
  const vexcoinData = useGetVexcoinData();

  const buyVexcoins = async privateKey => {
    let amount = amountRef.current.value;

    if (!amount || !privateKey) {
      toast({
        position: "bottom-right",
        title: "Error",
        description: "Please enter amount.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

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

    dispatch.user.setBalance(amount);
    setLoading(false);

    toast({
      position: "bottom-right",
      title: "Success",
      description: "You got your Vexcoins!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Flex h={"100%"} flexDir="column" justify="center">
      {loading && <GlobalLoading text={"Making transaction.."} />}
      <SignTransaction
        isOpen={isOpen}
        onClose={onClose}
        callbackFunction={buyVexcoins}
      />
      <VStack spacing={8}>
        {/* Data */}
        <Flex justify={"space-evenly"} w="100%">
          <VStack>
            <Text fontWeight={"light"} textTransform="uppercase">
              Vexcoins
            </Text>
            <Heading>
              {(parseInt(vexcoinData.vexcoin_amount) - parseInt(12345678))
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Heading>
          </VStack>

          <VStack>
            <Text fontWeight={"light"} textTransform="uppercase">
              Total Users
            </Text>
            <Heading>
              {(parseInt(vexcoinData.total_users) + parseInt(1500))
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Heading>
          </VStack>
        </Flex>

        {/* Buy action */}
        <Box w={"100%"}>
          <Input placeholder="How Many" ref={amountRef} />

          <Button
            w="100%"
            onClick={onOpen}
            leftIcon={<FaArrowCircleRight />}
            mt={2}
          >
            Get
          </Button>
        </Box>

        {/* Info */}
      </VStack>
    </Flex>
  );
};

export default BuyVexcoins;
