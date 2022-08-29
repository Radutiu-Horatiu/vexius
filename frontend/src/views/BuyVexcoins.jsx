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
  chakra,
} from "@chakra-ui/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowCircleRight } from "react-icons/fa";

import { auth } from "../firebase";
import SignTransaction from "../components/SignTransaction";
import GlobalLoading from "../components/GlobalLoading";

const BuyVexcoins = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const amountRef = useRef(null);
  const toast = useToast();
  const dispatch = useDispatch();
  const vexcoinData = useSelector(state => state.vexcoinData);

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

    try {
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
    } catch (error) {
      toast({
        position: "bottom-right",
        title: "Error",
        description: "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    } finally {
      setLoading(false);
    }

    dispatch.user.setBalance(amount);

    toast({
      position: "bottom-right",
      title: "Success",
      description: "You got your Vexcoins!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  if (!vexcoinData.initialized) return <GlobalLoading />;

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
        <Box>
          <Text
            textAlign={"center"}
            textTransform="uppercase"
            fontWeight={"light"}
            fontSize="md"
          >
            Get your vexcoins now and be an early bird{" "}
            <chakra.span fontWeight="medium">
              1 VX = 1$ / (number of thousand of users)
            </chakra.span>
          </Text>
          <Text textAlign={"center"} fontWeight={"light"} fontSize="xs">
            (This is a beta version and right now no real money is in use.)
          </Text>
        </Box>
      </VStack>
    </Flex>
  );
};

export default BuyVexcoins;
