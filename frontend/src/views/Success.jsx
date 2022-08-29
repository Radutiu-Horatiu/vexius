import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useClipboard,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaArrowRight, FaCopy } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PageNotFound = React.lazy(() => import("./PageNotFound"));

const Success = () => {
  const user = useSelector(state => state.user.value);
  const [hasCopied, setHasCopied] = useState(false);
  const { state } = useLocation();
  const { onCopy } = useClipboard(state?.privateKey);
  const toast = useToast();
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
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

  if (!state?.privateKey || !user) return <PageNotFound />;

  return (
    <Box>
      <Stack spacing={8} mx="auto" w="xl">
        <Heading textAlign={"center"} fontSize="4xl">
          Hi There, {user.fullName}!
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
              Copy Private Key To Continue
            </Button>
          ) : (
            <Button w={"100%"} leftIcon={<FaArrowRight />} onClick={goHome}>
              Continue
            </Button>
          )}
        </VStack>
      </Stack>
    </Box>
  );
};

export default Success;
