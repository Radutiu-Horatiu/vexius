import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useClipboard,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaArrowRight, FaCopy } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";

import { db } from "../firebase";
const PageNotFound = React.lazy(() => import("./PageNotFound"));

const Success = () => {
  const { state } = useLocation();
  const toast = useToast();
  const dispatch = useDispatch();
  const [hasCopied, setHasCopied] = useState(false);
  const { onCopy } = useClipboard(state?.privateKey);

  const confirm = async () => {
    let userData = {
      email: state.email,
      fullName: state.fullName,
      publicKey: state.publicKey,
    };

    // save user to firestore
    await setDoc(doc(db, "users", state.uid), userData);

    // send user to home
    dispatch.user.setUser(userData);
  };

  const copyPrivateKey = () => {
    onCopy();
    setHasCopied(true);
    toast({
      position: "bottom-right",
      title: "Yessir!",
      description: "Copied successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  if (!state?.privateKey) return <PageNotFound />;

  return (
    <Flex h="100vh" w="100vw" justify="center" align="center">
      <Stack spacing={8} mx="auto" w="xl">
        <Heading textAlign={"center"} fontSize="4xl">
          Hi There, {state.fullName}!
        </Heading>
        <VStack>
          <Box pb={8}>
            <Heading textAlign={"center"} fontSize="6xl">
              {state.privateKey.slice(0, 20)}...
            </Heading>
            <Text
              textAlign={"center"}
              fontSize="sm"
              textTransform={"capitalize"}
            >
              This is your private key. Store this somewhere safe because you
              will need this to sign transactions and do important stuff 😆
            </Text>
          </Box>
          {!hasCopied ? (
            <Button w={"100%"} leftIcon={<FaCopy />} onClick={copyPrivateKey}>
              Copy Private Key
            </Button>
          ) : (
            <Button w={"100%"} leftIcon={<FaArrowRight />} onClick={confirm}>
              Continue
            </Button>
          )}
        </VStack>
      </Stack>
    </Flex>
  );
};

export default Success;
